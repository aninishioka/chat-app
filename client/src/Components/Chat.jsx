import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../Contexts/SocketContext";
import { useAuth } from "../Contexts/UserContext";
import { v4 as uuidv4 } from "uuid";
import ChatHeader from "./ChatHeader";
import NewChatHeader from "./NewChatHeader";
import TextBubble from "./TextBubble";
import "./CSS/Chat.css";
import ChatBody from "./ChatBody";

function Chat() {
  const [chatId, setChatId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState();
  const { id } = useParams();
  const { curUser } = useAuth();
  const messagesEndRef = useRef();

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
          setMessages(data.messages);
          for (let user in data.participants) {
            if (data.participants[user].firebaseUid !== curUser.uid)
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
    <div className="chat-container">
      <div className="chat-header-container">{displayHeader()}</div>
      {participant && (
        <ChatBody participant={participant} chatId={chatId}></ChatBody>
      )}
    </div>
  );
}

export default Chat;
