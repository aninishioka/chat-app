import React from "react";
import "./CSS/UserCard.css";
import { useAuth } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function UserCard(props) {
  const { curUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    curUser
      .getIdToken()
      .then((token) => {
        return fetch("/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AuthToken: token,
          },
          body: JSON.stringify({
            selfFbUid: curUser.uid,
            otherFbUid: props.userUid,
          }),
        });
      })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        if (data.chatId !== null) {
          navigate("../" + data.chatId);
        } else {
          props.setChatName(props.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      id="card"
      className="border border-0"
      onClick={handleClick}
      /* to={"../" + props.userUid}
      state={{ userUid: props.userUid, username: props.username }} */
    >
      <div className="user-card rounded pointer">
        {/* avatar */}
        <div className="avatar-container">
          <div className="avatar rounded-circle"></div>
        </div>
        {/* username */}
        <div className="username">
          <span>{props.username}</span>
        </div>
      </div>
    </button>
  );
}

export default UserCard;
