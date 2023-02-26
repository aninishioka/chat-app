import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Contexts/SocketContext";
import { useAuth } from "../Contexts/UserContext";
import { v4 as uuidv4 } from "uuid";
import ChatHeader from "./ChatHeader";
import ComposeMsg from "./ComposeMsg";
import NewChatHeader from "./NewChatHeader";
import TextBubble from "./TextBubble";
import "./CSS/Chat.css";

function Chat() {
  const [chatId, setChatId] = useState();
  const [isNew, setIsNew] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState("");
  const { id } = useParams();
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (data.to !== curUser) {
        handleNewMessage(data.message, data.sender);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      setChatId(id);
      setIsNew(false);

      curUser
        .getIdToken()
        .then((token) => {
          return fetch("/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              AuthToken: token,
            },
            body: JSON.stringify({
              chatId: id,
            }),
          });
        })
        .then((res) => {
          if (res.ok) return res.json();
          else throw res;
        })
        .then((data) => {
          setMessages(data.messages);
          for (let user in data.participants) {
            if (data.participants[user].firebaseUid !== curUser.uid)
              setChatName(data.participants[user].username);
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
    if (!isNew) return <ChatHeader chatName={chatName}></ChatHeader>;
    else return <NewChatHeader></NewChatHeader>;
  }

  function displayMessages() {
    if (Array.isArray(messages)) {
      return messages.map((message) => {
        return (
          <TextBubble
            key={message._id}
            message={message.message}
            senderIsSelf={message.userId === curUser}
          ></TextBubble>
        );
      });
    }
  }

  function handleNewMessage(message, sender) {
    setMessages([
      ...messages,
      { message: message, userId: sender, _id: uuidv4() },
    ]);
  }

  return (
    <div className="chat-container">
      <div className="chat-header-container">{displayHeader()}</div>
      <>
        <div className="chat-body">
          <div className="messages">{displayMessages()}</div>
        </div>
        <ComposeMsg
          handleNewMessage={handleNewMessage}
          chatId={chatId}
        ></ComposeMsg>
      </>
    </div>
  );
}

export default Chat;
