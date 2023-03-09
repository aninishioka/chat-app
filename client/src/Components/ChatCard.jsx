import React from "react";
import "./CSS/ChatCard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";

function ChatCard(props) {
  const { curUser } = useAuth();

  return (
    <Link
      to={"/chats/" + props.chat._id}
      state={{ userId: props.participant.user_id }}
    >
      <div className="chat-card rounded pointer">
        <span className="link"></span>
        {/* avatar */}
        <div className="avatar-container">
          <div className="avatar rounded-circle"></div>
        </div>
        <div>
          {/* username */}
          <div className="chat-name">
            <span>{props.participant.username}</span>
          </div>

          {/* chat prev */}
          <div className="chat-preview">
            <span className="chat-preview-span">{`${
              props.chat.last_message_author.user_id === curUser.uid
                ? "You"
                : props.chat.last_message_author.username
            }: ${props.chat.last_message}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatCard;
