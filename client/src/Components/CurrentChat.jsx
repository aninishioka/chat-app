import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ComposeMsg from "./ComposeMsg";
import "./CSS/CurrentChat.css";
import TextBubble from "./TextBubble";
import { SocketContext } from "../Contexts/SocketContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../Contexts/UserContext";

function CurrentChat() {
  let { name } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState({});
  const loc = useLocation();
  const { userId } = { ...loc.state };
  const socket = useContext(SocketContext);
  const self = useContext(UserContext);

  useEffect(() => {
    fetch(
      "/chats?" +
        new URLSearchParams({
          userId: userId,
        }),
      {}
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setMessages(data.messages);
        setChatId(data.chatId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loc]);

  socket.on("receive-message", (data) => {
    handleNewMessage(data.message, data.sender);
  });

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
            senderIsSelf={message.userId === self}
          ></TextBubble>
        );
      });
    }
  };
  return (
    <div className="currentChat">
      {/* header */}
      <div className="currentChat__header">{name}</div>
      {/* chat body */}
      <div className="currentChat__body">
        {/* chat blocks */}
        {displayMessages()}
      </div>
      {/* compose new message */}
      <ComposeMsg
        handleNewMessage={handleNewMessage}
        chatId={chatId}
        other={userId}
      ></ComposeMsg>
    </div>
  );
}

export default CurrentChat;
