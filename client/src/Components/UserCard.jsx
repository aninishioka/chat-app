import React, { useEffect, useState } from "react";
import "./CSS/UserCard.css";
import { useAuth } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import placeholderAvatar from "../Assets/placeholder-avatar.svg";

function UserCard(props) {
  const [avatar, setAvatar] = useState(placeholderAvatar);
  const { curUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.participant.avatar) {
      setAvatar(props.participant.avatar);
    }
  }, []);

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
          <img
            src={avatar}
            className="rounded-circle"
            style={{ width: 48, height: 48 }}
          ></img>
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
