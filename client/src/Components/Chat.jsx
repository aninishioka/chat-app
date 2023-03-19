import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import ChatHeader from "./ChatHeader";
import NewChatHeader from "./NewChatHeader";
import "./CSS/Chat.css";
import ChatBody from "./ChatBody";

function Chat() {
  const [chatId, setChatId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [participant, setParticipant] = useState();
  const { id } = useParams();
  const { curUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setChatId(id);
    if (id) {
      setIsNew(false);

      curUser
        .getIdToken()
        .then((token) => {
          return fetch(
            "/messages?" +
              new URLSearchParams({
                chatId: id,
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
          else throw res;
        })
        .then((data) => {
          if (
            typeof data.participants === undefined ||
            data.participants.length === 0
          )
            navigate("../");
          for (let user in data.participants) {
            if (data.participants[user].user_id !== curUser.uid)
              setParticipant(data.participants[user]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsNew(true);
    }
  }, [id]);

  function displayHeader() {
    if (!isNew) return <ChatHeader participant={participant}></ChatHeader>;
    else
      return (
        <NewChatHeader
          setParticipant={setParticipant}
          setChatId={setChatId}
        ></NewChatHeader>
      );
  }

  return (
    <div id="chat-container">
      <div id="chat-header-container">{displayHeader()}</div>
      {participant && (
        <ChatBody participant={participant} chatId={chatId}></ChatBody>
      )}
    </div>
  );
}

export default Chat;
