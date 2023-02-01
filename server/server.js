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
const selfId = mongoose.Types.ObjectId("63ca28374d1ee7c2e07c22d6");
/* const Chat = require("./Models/Chat");
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
  socket.on("send-message", async (msg, chatId) => {
    const messageDoc = await Message.create({
      message: msg,
      chatId: mongoose.Types.ObjectId(chatId),
      userId: selfId,
    });
    socket.broadcast.emit("receive-message", {
      message: msg,
      id: messageDoc.id,
      sender: selfId,
    });
  });
  /*   socket.on("send-message", async (msg, members, chatId) => {
    let chatDoc = null;
    if (chatId === null) {
      const memberIds = members.map((member) => {
        return mongoose.Types.ObjectId(member);
      });
      chatDoc = await Chat.create({
        participants: [...memberIds, selfId],
      });
      await User.updateMany(
        { _id: { $in: [...memberIds, selfId] } },
        { $push: { chatIds: chatDoc._id } }
      );
    }
    const msgDoc = await Message.create({
      message: msg,
      userId: selfId,
      chatId: chatId || chatDoc._id,
    });
    socket.emit("send-chatId", msgDoc.chatId);
  }); */
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
