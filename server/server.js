if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const chats = require("./Routes/chats");
const socketio = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use("/chats", chats);

io.on("connection", (socket) => {});

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/test");

server.listen(port, () => {
  console.log("app listening on port 5000");
});
