import React from "react";
import "./CSS/UserCard.css";
import { useAuth } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function UserCard(props) {
  const { curUser } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
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
            otherId: props.userId,
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
          props.createNewChat(props.userId, props.username);
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
      onClick={handleButtonClick}
      /* to={"../" + props.userId}
      state={{ userId: props.userId, username: props.username }} */
    >
      <div className="userCard rounded pointer">
        {/* avatar */}
        <div className="avatar__container">
          <div className="avatar rounded-circle"></div>
        </div>
        {/* username */}
        <div className="user__name">
          <span>{props.username}</span>
        </div>
      </div>
    </button>
  );
}

export default UserCard;
