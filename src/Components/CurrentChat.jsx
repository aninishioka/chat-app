import React, { Component } from "react";
import ChatBlock from "./ChatBlock";
import ComposeMsg from "./ComposeMsg";
import "./CSS/CurrentChat.css";
import TextBubble from "./TextBubble";

class CurrentChat extends Component {
  state = { contactName: "" };
  render() {
    return (
      <div className="currentChat">
        {/* header */}
        <div className="currentChat__header"></div>
        {/* chat body */}
        <div className="currentChat__body">
          <ChatBlock></ChatBlock>
        </div>
        {/* compose new message */}
        <ComposeMsg></ComposeMsg>
      </div>
    );
  }
}

export default CurrentChat;
