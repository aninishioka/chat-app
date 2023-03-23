import React, { useState, useEffect, useRef, useContext } from "react";
import ComposeMsg from "./ComposeMsg";
import TextBubble from "./TextBubble";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../Contexts/UserContext";
import { SocketContext } from "../Contexts/SocketContext";
import { useNavigate } from "react-router-dom";
import "./CSS/ChatBody.css";

function ChatBody(props) {
  const [messages, setMessages] = useState([]);
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const messagesEndRef = useRef();

  useEffect(() => {
    if (!props.chatId) return;
    curUser
      .getIdToken()
      .then((token) => {
        return fetch(
          "/messages?" +
            new URLSearchParams({
              chatId: props.chatId,
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
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("receive-message", (message, chatId, author) => {
      if (chatId === props.chatId) {
        displayNewMessage(message, author);
      }
    });

    return () => {
      socket.off("user-joined");
      socket.off("receive-message");
    };
  }, [props.chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function displayMessages() {
    if (Array.isArray(messages)) {
      return messages.map((message) => {
        return (
          <TextBubble
            key={message._id}
            message={message.message}
            senderIsSelf={message.author === curUser.uid}
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
    if (!props.chatId) {
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
              selfUid: curUser.uid,
              otherUid: props.participant.user_id,
            }),
          });
        })
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then((data) => {
          socket.emit("send-message", message, data.chatId, curUser.uid);
          navigate("../" + data.chatId);
        });
    } else {
      socket.emit("send-message", message, props.chatId, curUser.uid);
    }
  }

  function scrollToBottom() {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView(false);
  }

  return (
    <>
      <div id="chat-body">
        <div id="messages">
          {displayMessages()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={messagesEndRef}
          ></div>
        </div>
      </div>
      <ComposeMsg
        displayNewMessage={displayNewMessage}
        chatId={props.chatId}
        sendMessage={sendMessage}
      />
    </>
  );
}

export default ChatBody;
