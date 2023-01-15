const express = require("express");
const app = express();
const port = 5000;

app.get("/chats", (req, res) => {
  res.json({
    chats: [
      {
        name: "Nigel",
        messages: [
          ["Nigel", "hey"],
          ["Anissa", "hi"],
          ["Anissa", "what are you up to"],
        ],
      },
      { name: "Ryan", messages: [["Anissa", "soup"]] },
      { name: "Grace", messages: [["Grace", "woot"]] },
      { name: "Nicole", messages: [["Anissa", "lol"]] },
    ],
  });
});

app.listen(port, () => {
  console.log("app listening on port 5000");
});
