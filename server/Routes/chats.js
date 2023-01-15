const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

module.exports = router;
