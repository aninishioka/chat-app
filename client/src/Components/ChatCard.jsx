import React from "react";
import "./CSS/ChatCard.css";
import { Link } from "react-router-dom";

function ChatCard(props) {
  return (
    <Link to={"/chats/" + props.name} state={{ userId: props.userId }}>
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

export default ChatCard;
