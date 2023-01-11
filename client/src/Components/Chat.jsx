import React, { Component } from "react";
import "./CSS/Chat.css";
import { Link } from "react-router-dom";

class Chat extends Component {
  state = {};
  render() {
    return (
      <Link to={"chats/" + this.props.name}>
        <div className="chat rounded pointer">
          <span className="link"></span>
          {/* avatar */}
          <div className="avatar__container">
            <div className="avatar rounded-circle"></div>
          </div>
          <div>
            {/* username */}
            <div className="chat__name">
              <span>{this.props.name}</span>
            </div>

            {/* chat prev */}
            <div className="chat__preview">
              <span>{this.props.lastMsg}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Chat;
