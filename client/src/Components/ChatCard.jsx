import React from "react";
import "./CSS/ChatCard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";

function ChatCard(props) {
  const { curUser } = useAuth();

  return (
    <Link to={"/chats/" + props.chatId} state={{ userId: props.userId }}>
      <div className="chat-card rounded pointer">
        <span className="link"></span>
        {/* avatar */}
        <div className="avatar-container">
          <div className="avatar rounded-circle"></div>
        </div>
        <div>
          {/* username */}
          <div className="chat-name">
            <span>{props.username}</span>
          </div>

          {/* chat prev */}
          <div className="chat-preview">
            <span className="chat-preview-span">{`${
              props.lastMsgBy === curUser.uid ? "You" : props.username
            }: ${props.lastMsg}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatCard;
