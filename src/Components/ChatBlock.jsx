import React, { Component } from "react";
import TextBubble from "./TextBubble";
import "./CSS/ChatBlock.css";

class ChatBlock extends Component {
  state = {};
  render() {
    return (
      <div className="chatBlock self">
        {/* profile picture if sender not self */}
        {/* textBubbles */}
        <TextBubble></TextBubble>
        <TextBubble></TextBubble>
      </div>
    );
  }
}

export default ChatBlock;
