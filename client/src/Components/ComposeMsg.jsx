import React from "react";
import "./CSS/ComposeMsg.css";
import { SocketContext } from "../Contexts/SocketContext";
import { useContext } from "react";

function ComposeMsg(props) {
  const socket = useContext(SocketContext);
  const handleClick = () => {
    displayNewMessage();
  };
  const handleKeyPress = (e) => {
    if (e.shiftKey && e.keyCode === 13) return;
    if (e.keyCode === 13) {
      e.preventDefault();
      const msg = document.getElementById("msg").value.trimEnd();
      if (msg) {
        sendMessage(msg, props.chatId);
        displayNewMessage(msg);
      }
    }
  };
  const displayNewMessage = (msg) => {
    if (msg) {
      document.getElementById("msg").value = "";
      props.handleNewMessage(msg, props.senderIsSelf);
    }
  };
  const sendMessage = (msg, chatId) => {
    socket.emit("send-message", msg, chatId);
  };
  return (
    <div id="composeMsg" className="input-group">
      <textarea
        className="composeMsg__input form-control rounded-pill"
        aria-label="text input"
        placeholder="Message"
        rows="1"
        id="msg"
        onKeyDown={handleKeyPress}
      ></textarea>
      <button
        className="composeMsg__sendButton btn"
        type="submit"
        onClick={handleClick}
      >
        <span className="material-symbols-outlined">arrow_circle_up</span>
      </button>
    </div>
  );
}

export default ComposeMsg;
