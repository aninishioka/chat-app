if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const https = require("https");
const fs = require("fs");
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

io.on("connection", (socket) => {
  socket.on("logged-in", async (user_id) => {
    const client = new MongoClient(process.env.DATABASE_URL);

    try {
      await client.connect();
      const db = client.db("chat-app-db");
      const participants = db.collection("participants");
      await participants.updateOne(
        { user_id: user_id },
        { socket_id: socket.id }
      );
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  });

  socket.on("logged-out", async (firebaseUid) => {
    const client = new MongoClient(process.env.DATABASE_URL);

    try {
      await client.connect();
      const db = client.db("chat-app-db");
      const participants = db.collection("participants");
      await participants.updateOne({ user_id: user_id }, { socket_id: null });
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  });

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
        author: { user_id: uid, username: messageAuthor.username },
        chat_id: chatId,
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
    } catch (err) {
    } finally {
      await client.close();
    }

    /*const sockets = [];
    chat.participants.forEach(async (participant) => {
      Participant.findOne({ user_id: participant.user_id }, { socketId: 1 })
        .then((participantDoc) => {
          if (!participantDoc) return;
          if (participant.userId !== firebaseUid && participantDoc.socket_id) {
            sockets.push(participantDoc.socket_id);
          }
        })
        .then(() => {
          sockets.forEach((userSocket) => {
            socket.to(userSocket).emit("receive-message", {
              message: message,
              chatId: chat._id,
              author: {
                user_id: firebaseUid,
                username: participant.username,
              },
            });
            socket.to(userSocket).emit("new-message", chat);
          });
        });
    });

    socket.emit("new-message", chat); */
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
