import React, { useContext } from "react";
import "./CSS/ChatCard.css";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function ChatCard(props) {
  const self = useContext(UserContext);

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
            <span className="chat__preview__span">{`${
              props.lastMsgBy === self ? "You" : props.name
            }: ${props.lastMsg}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatCard;
