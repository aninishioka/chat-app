import React, { Component } from "react";
import "./CSS/TextBubble.css";

class TextBubble extends Component {
  state = {};

  render() {
    return (
      <div className={"textBubble rounded-pill align-middle self"}>
        <span>hello</span>
      </div>
    );
  }
}

export default TextBubble;
