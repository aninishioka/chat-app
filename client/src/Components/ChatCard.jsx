import React from "react";
import "./CSS/ChatCard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";

function ChatCard(props) {
  const { curUser } = useAuth();

  return (
    <Link to={"/chats/" + props.chatId} state={{ userId: props.userId }}>
      <div className="chat rounded pointer">
        <span className="link"></span>
        {/* avatar */}
        <div className="avatar__container">
          <div className="avatar rounded-circle"></div>
        </div>
        <div>
          {/* username */}
          <div className="chat__name">
            <span>{props.username}</span>
          </div>

          {/* chat prev */}
          <div className="chat__preview">
            <span className="chat__preview__span">{`${
              props.lastMsgBy === curUser.uid ? "You" : props.username
            }: ${props.lastMsg}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatCard;
