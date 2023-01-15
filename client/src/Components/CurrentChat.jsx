import React, { Component } from "react";
import { useParams } from "react-router-dom";
import ChatBlock from "./ChatBlock";
import ComposeMsg from "./ComposeMsg";
import "./CSS/CurrentChat.css";
import TextBubble from "./TextBubble";

function CurrentChat(props) {
  let { name } = useParams();

  return (
    <div className="currentChat">
      {/* header */}
      <div className="currentChat__header">{name}</div>
      {/* chat body */}
      <div className="currentChat__body">{/* chat blocks */}</div>
      {/* compose new message */}
      <ComposeMsg></ComposeMsg>
    </div>
  );
}

export default CurrentChat;
