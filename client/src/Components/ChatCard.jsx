import React, { useEffect, useState } from "react";
import "./CSS/ChatCard.css";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import placeholderAvatar from "../Assets/placeholder-avatar.svg";

function ChatCard(props) {
  const { curUser } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [avatar, setAvatar] = useState(placeholderAvatar);
  const { pathname } = useLocation();

  useEffect(() => {
    if (props.participant.avatar) {
      setAvatar(props.participant.avatar);
    }
  }, []);

  useEffect(() => {
    const match = matchPath({ path: "/chats/:id" }, pathname);
    if (match) setIsActive(match.params.id === props.chat._id);
  }, [pathname]);

  return (
    <Link to={"/chats/" + props.chat._id}>
      <div
        className={`chat-card rounded pointer ${isActive ? "isActive" : ""}`}
      >
        <span className="link"></span>
        {/* avatar */}
        <div className="avatar-container">
          <img
            src={avatar}
            className="rounded-circle"
            style={{ width: 48, height: 48 }}
          ></img>
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
