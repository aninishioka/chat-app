const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json({
    chats: [
      { name: "Nigel", lastMsg: "hey" },
      { name: "Ryan", lastMsg: "?" },
      { name: "Grace", lastMsg: "lol" },
      { name: "Nicole", lastMsg: "woo" },
    ],
  });
});

app.listen(port, () => {
  console.log("app listening on port 5000");
});
