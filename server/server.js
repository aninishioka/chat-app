if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const chats = require("./Routes/chats");
const users = require("./Routes/users");
const messages = require("./Routes/messages");
const index = require("./Routes/index");
const auth = require("./middleware/auth");
const participants = require("./Routes/participants");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const Message = require("./Models/Message");
const Chat = require("./Models/Chat");
const User = require("./Models/User");
const Participant = require("./Models/Participant");
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(auth);
app.use("/", index);
app.use("/chats", chats);
app.use("/users", users);
app.use("/participants", participants);
app.use("/messages", messages);

io.on("connection", (socket) => {
  socket.on("logged-in", async (firebaseUid) => {
    await Participant.updateOne(
      { firebaseUid: firebaseUid },
      { socketId: socket.id }
    );
  });

  socket.on("logged-out", async (firebaseUid) => {
    await Participant.updateOne(
      { firebaseUid: firebaseUid },
      { socketId: null }
    );
  });

  socket.on("send-message", async (message, chatId, firebaseUid) => {
    const participant = await Participant.findOne(
      { firebaseUid: firebaseUid },
      { username: 1 }
    );

    //create new message
    const messageDoc = await Message.create({
      message: message,
      chatId: mongoose.Types.ObjectId(chatId),
      author: { firebaseUid: firebaseUid, username: participant.username },
    });

    //update corresponding chat's most recent message
    await Chat.updateOne(
      { _id: mongoose.Types.ObjectId(chatId) },
      {
        lastMessage: message,
        lastMessageTime: messageDoc.createdAt,
        lastMessageAuthor: {
          firebaseUid: firebaseUid,
          username: participant.username,
        },
      }
    );
    const chat = await Chat.findOne({ _id: mongoose.Types.ObjectId(chatId) });

    const sockets = [];
    chat.participants.forEach(async (participant) => {
      Participant.findOne(
        { firebaseUid: participant.firebaseUid },
        { socketId: 1 }
      )
        .then((participantDoc) => {
          if (
            participant.firebaseUid !== firebaseUid &&
            participantDoc.socketId
          ) {
            sockets.push(participantDoc.socketId);
          }
        })
        .then(() => {
          sockets.forEach((userSocket) => {
            socket.to(userSocket).emit("receive-message", {
              message: message,
              chatId: chat._id,
              author: {
                firebaseUid: firebaseUid,
                username: participant.username,
              },
            });
          });
        });
    });

    socket.emit("new-message", chat);
  });
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
