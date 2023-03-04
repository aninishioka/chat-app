import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../Contexts/SocketContext";
import { useAuth } from "../Contexts/UserContext";
import { v4 as uuidv4 } from "uuid";
import ChatHeader from "./ChatHeader";
import ComposeMsg from "./ComposeMsg";
import NewChatHeader from "./NewChatHeader";
import TextBubble from "./TextBubble";
import "./CSS/Chat.css";

function Chat() {
  const [chatId, setChatId] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState("");
  const [participant, setParticipant] = useState();
  const { id } = useParams();
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (data.chatId === id) {
        displayNewMessage(data.message, data.author);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    setChatId(id);
    if (id) {
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
    scrollToBottom();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView(false);
  }

  function displayHeader() {
    if (!isNew) return <ChatHeader chatName={chatName}></ChatHeader>;
    else
      return (
        <NewChatHeader
          setChatName={setChatName}
          setParticipant={setParticipant}
        ></NewChatHeader>
      );
  }

  function displayMessages() {
    if (Array.isArray(messages)) {
      return messages.map((message) => {
        return (
          <TextBubble
            key={message._id}
            message={message.message}
            senderIsSelf={message.author.firebaseUid === curUser.uid}
          ></TextBubble>
        );
      });
    }
  }

  function displayNewMessage(message, author) {
    setMessages((curMessages) => [
      ...curMessages,
      { message: message, author: author, _id: uuidv4() },
    ]);
  }

  function sendMessage(message) {
    if (isNew) {
      curUser
        .getIdToken()
        .then((token) => {
          return fetch("/chats/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              AuthToken: token,
            },
            body: JSON.stringify({
              selfFbUid: curUser.uid,
              otherFbUid: participant,
            }),
          });
        })
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then((data) => {
          socket.emit("send-message", message, data.chatId, curUser.uid);
          navigate("../" + data.chatID);
        });
    } else {
      socket.emit("send-message", message, chatId, curUser.uid);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header-container">{displayHeader()}</div>
      {!isNew && (
        <div className="chat-body">
          <div className="messages">
            {displayMessages()}
            <div
              style={{ float: "left", clear: "both" }}
              ref={messagesEndRef}
            ></div>
          </div>
        </div>
      )}
      {chatName && (
        <ComposeMsg
          displayNewMessage={displayNewMessage}
          chatId={chatId}
          sendMessage={sendMessage}
        ></ComposeMsg>
      )}
    </div>
  );
}

export default Chat;
