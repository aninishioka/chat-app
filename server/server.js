const express = require("express");
const chats = require("./Routes/chats");
const app = express();
const port = 5000;

app.use("/chats", chats);

app.listen(port, () => {
  console.log("app listening on port 5000");
});
