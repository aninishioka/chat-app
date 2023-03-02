import React from "react";
import "./CSS/ComposeMsg.css";
import { SocketContext } from "../Contexts/SocketContext";
import { useContext } from "react";
import { useAuth } from "../Contexts/UserContext";

function ComposeMsg(props) {
  const socket = useContext(SocketContext);
  const { curUser } = useAuth();

  const handleClick = () => {
    const message = document.getElementById("msg").value.trimEnd();
    displayNewMessage(message);
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
    props.handleNewMessage(message, { firebaseUid: curUser.uid });
  };
  const sendMessage = (message, chatId) => {
    if (!chatId) {
      props.createNewChat();
    }
    socket.emit("send-message", message, chatId, curUser.uid);
  };
  return (
    <div id="compose-msg" className="input-group">
      <div className="compose-msg-input-container">
        <textarea
          className="composeMsg-input form-control rounded-pill"
          aria-label="text input"
          placeholder="Message"
          rows="1"
          id="msg"
          onKeyDown={handleKeyPress}
        ></textarea>
        <button
          className="compose-msg-send-button btn"
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
