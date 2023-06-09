import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ComposeMsg from "./ComposeMsg";
import "./CSS/CurrentChat.css";
import TextBubble from "./TextBubble";
import { SocketContext } from "../Contexts/SocketContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../Contexts/UserContext";

function CurrentChat() {
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState();
  const { chatId } = useParams();
  const loc = useLocation();
  const socket = useContext(SocketContext);
  const { curUser, mongoUser } = useAuth();

  useEffect(() => {
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
            chatId: chatId,
          }),
        });
      })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setMessages(data.messages);
        for (let user in data.participants) {
          if (data.participants[user].participantId !== mongoUser.participantId)
            setParticipant(data.participants[user]);
        }
        setParticipant(data.participant);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loc]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (data.to !== participant._id) {
        handleNewMessage(data.message, data.sender);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const handleNewMessage = (message, sender) => {
    setMessages([
      ...messages,
      { message: message, userId: sender, _id: uuidv4() },
    ]);
  };
  const displayMessages = () => {
    if (typeof messages !== "undefined" && Array.isArray(messages)) {
      return messages.map((message) => {
        return (
          <TextBubble
            key={message._id}
            message={message.message}
            senderIsSelf={message.userId !== participant}
          ></TextBubble>
        );
      });
    }
  };
  return (
    participant && (
      <div className="current-chat">
        {/* header */}
        <div className="current-chat-header">{participant.username}</div>
        {/* chat body */}
        <div className="current-chat-body">
          {/* chat blocks */}
          <div className="current-chat-body-inner-container">
            {displayMessages()}
          </div>
        </div>
        {/* compose new message */}
        <ComposeMsg
          handleNewMessage={handleNewMessage}
          chatId={chatId}
          other={participant._id}
        ></ComposeMsg>
      </div>
    )
  );
}

export default CurrentChat;
