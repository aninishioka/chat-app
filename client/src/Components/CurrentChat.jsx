import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ComposeMsg from "./ComposeMsg";
import "./CSS/CurrentChat.css";
import TextBubble from "./TextBubble";

function CurrentChat(props) {
  let { name } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState({});
  const loc = useLocation();
  const { userId } = { ...loc.state };

  useEffect(() => {
    fetch(
      "/chats?" +
        new URLSearchParams({
          userId: userId,
        }),
      {}
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setMessages(data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleNewMessage = (msg) => {
    setMessages([...messages, { msg: msg, sender: "self" }]);
  };

  const displayMessages = () => {
    if (typeof messages !== "undefined" && Array.isArray(messages)) {
      return messages.map((message) => {
        return (
          <TextBubble
            message={message.msg}
            sender={message.sender}
          ></TextBubble>
        );
      });
    }
  };

  return (
    <div className="currentChat">
      {/* header */}
      <div className="currentChat__header">{name}</div>
      {/* chat body */}
      <div className="currentChat__body">
        {/* chat blocks */}
        {displayMessages()}
      </div>
      {/* compose new message */}
      <ComposeMsg displayNewMessage={handleNewMessage}></ComposeMsg>
    </div>
  );
}

export default CurrentChat;
