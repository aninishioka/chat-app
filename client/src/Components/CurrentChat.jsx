import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ComposeMsg from "./ComposeMsg";
import "./CSS/CurrentChat.css";
import TextBubble from "./TextBubble";

function CurrentChat(props) {
  let { name } = useParams();
  const [messages, setMessages] = useState([]);

  const displayNewMessage = (msg) => {
    setMessages([...messages, { msg: msg, sender: "self" }]);
  };

  return (
    <div className="currentChat">
      {/* header */}
      <div className="currentChat__header">{name}</div>
      {/* chat body */}
      <div className="currentChat__body">
        {/* chat blocks */}
        {messages.map((message) => {
          return (
            <TextBubble
              message={message.msg}
              sender={message.sender}
            ></TextBubble>
          );
        })}
      </div>
      {/* compose new message */}
      <ComposeMsg displayNewMessage={displayNewMessage}></ComposeMsg>
    </div>
  );
}

export default CurrentChat;
