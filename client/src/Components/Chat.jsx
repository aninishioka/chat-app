import React from "react";
import "./CSS/Chat.css";
import { Link } from "react-router-dom";

function Chat(props) {
  return (
    <Link to={"chats/" + props.name}>
      <div className="chat rounded pointer">
        <span className="link"></span>
        {/* avatar */}
        <div className="avatar__container">
          <div className="avatar rounded-circle"></div>
        </div>
        <div>
          {/* username */}
          <div className="chat__name">
            <span>{props.name}</span>
          </div>

          {/* chat prev */}
          <div className="chat__preview">
            <span>{props.lastMsg}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Chat;
