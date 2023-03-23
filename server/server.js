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
const { MongoClient, ObjectId } = require("mongodb");
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

let user_id;

io.on("connection", (socket) => {
  socket.on("logged-in", async (user_id) => {
    socket.join(user_id);
  });

  socket.on("disconnect", async (user_id) => {
    if (user_id) {
      socket.leave(user_id);
    }
  });

  socket.on("logged-out", async () => {
    socket.leave(user_id);
    user_id = null;
  });

  //insert new message into db and emit to appropriate participants
  socket.on("send-message", async (message, chatId, uid) => {
    const client = new MongoClient(process.env.DATABASE_URL);

    try {
      await client.connect();
      const db = client.db("chat-app-db");

      //get author doc
      const participants = db.collection("participants");
      const messageAuthor = await participants.findOne({ user_id: uid });

      //create new message doc and insert into db
      const messages = db.collection("messages");
      const messageDoc = {
        message: message,
        author: uid,
        chat_id: new ObjectId(chatId),
        created_on: Date.now(),
      };
      await messages.insertOne(messageDoc);

      //update corresponding chat doc
      const chats = db.collection("chats");
      await chats.updateOne(
        { _id: new ObjectId(chatId) },
        {
          $set: {
            last_message: message,
            last_message_author: {
              user_id: messageAuthor.user_id,
              username: messageAuthor.username,
            },
            last_updated: messageDoc.created_on,
          },
        }
      );

      //send new chat/message information to clients
      const chat = await chats.findOne({ _id: new ObjectId(chatId) });
      chat.participants.forEach((participant) => {
        socket.to(participant.user_id).emit("new-message", chat);
        if (participant.user_id !== uid) {
          socket
            .to(participant.user_id)
            .emit("receive-message", message, chatId, {
              user_id: uid,
              username: participant.username,
            });
        }
      });
    } catch (err) {
    } finally {
      await client.close();
    }
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
