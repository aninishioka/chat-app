import React, { Component } from "react";
import "./CSS/TextBubble.css";

class TextBubble extends Component {
  render() {
    return (
      <div
        className={"textBubble rounded-pill align-middle " + this.props.sender}
      >
        <span>{this.props.message}</span>
      </div>
    );
  }
}

export default TextBubble;