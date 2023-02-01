if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const chats = require("./Routes/chats");
const users = require("./Routes/users");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const Message = require("./Models/Message");
const Chat = require("./Models/Chat");
const selfId = mongoose.Types.ObjectId("63ca28374d1ee7c2e07c22d6");
/* 
const User = require("./Models/User");
 */

const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/chats", chats);
app.use("/users", users);

io.on("connection", (socket) => {
  socket.on("send-message", async (message, chatId) => {
    //create new message
    const messageDoc = await Message.create({
      message: message,
      chatId: mongoose.Types.ObjectId(chatId),
      userId: selfId,
    });
    //update corresponding chat's most recent message
    await Chat.updateOne(
      { _id: mongoose.Types.ObjectId(chatId) },
      { lastMessage: message, lastMessageTime: messageDoc.createdAt }
    );
    socket.broadcast.emit("receive-message", {
      message: message,
      id: messageDoc.id,
      sender: selfId,
    });
  });
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
