import React, { Component } from "react";
import "./CSS/Chat.css";

class Chat extends Component {
  state = {};
  render() {
    return (
      <div className="chat rounded pointer">
        {/* avatar */}
        <div className="avatar__container">
          <div className="avatar rounded-circle"></div>
        </div>
        <div>
          {/* username */}
          <div className="chat__name">
            <span>First Last</span>
          </div>

          {/* chat prev */}
          <div className="chat__preview">
            <span>lorem ipsum</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
