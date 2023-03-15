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
        return fetch(
          "/chats?" +
            new URLSearchParams({
              selfUid: curUser.uid,
              otherUid: props.participant.user_id,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              AuthToken: token,
            },
          }
        );
      })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        if (data.chatId) {
          props.setChatId(data.chatId);
          navigate("../" + data.chatId);
        } else {
          props.setParticipant(props.participant);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      id="user-card-container"
      className="border border-0"
      onClick={handleClick}
    >
      <div className="user-card rounded pointer">
        {/* avatar */}
        <div className="avatar-container">
          <div className="avatar rounded-circle"></div>
        </div>
        {/* username */}
        <div className="username">
          <span>{props.participant.username}</span>
        </div>
      </div>
    </button>
  );
}

export default UserCard;
