const express = require("express");
const chats = require("./Routes/chats");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = process.env.port || 5000;
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

app.use("/chats", chats);

io.on("connection", (socket) => {});

server.listen(port, () => {
  console.log("app listening on port 5000");
});
