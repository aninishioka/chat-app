import React from "react";
import "./CSS/UserCard.css";
import { Link } from "react-router-dom";

function UserCard(props) {
  return (
    <Link to={"../" + props.name} state={{ userId: props.userId }}>
      <div className="userCard rounded pointer">
        {/* avatar */}
        <div className="avatar__container">
          <div className="avatar rounded-circle"></div>
        </div>
        {/* username */}
        <div className="user__name">
          <span>{props.name}</span>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
