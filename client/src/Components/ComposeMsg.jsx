import React from "react";
import "./CSS/ComposeMsg.css";
import { SocketContext } from "../Contexts/SocketContext";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

function ComposeMsg(props) {
  const socket = useContext(SocketContext);
  const self = useContext(UserContext);
  const handleClick = () => {
    displayNewMessage();
  };
  const handleKeyPress = (e) => {
    if (e.shiftKey && e.keyCode === 13) return;
    if (e.keyCode === 13) {
      e.preventDefault();
      const message = document.getElementById("msg").value.trimEnd();
      if (message) {
        displayNewMessage(message);
        sendMessage(message, props.chatId);
      }
    }
  };
  const displayNewMessage = (message) => {
    document.getElementById("msg").value = "";
    props.handleNewMessage(message, self);
  };
  const sendMessage = (message, chatId) => {
    socket.emit("send-message", message, chatId, props.other);
  };
  return (
    <div id="composeMsg" className="input-group">
      <div className="composeMsg_input_container">
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
    </div>
  );
}

export default ComposeMsg;
