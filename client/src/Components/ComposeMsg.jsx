import React, { useRef } from "react";
import "./CSS/ComposeMsg.css";
import { useAuth } from "../Contexts/UserContext";

function ComposeMsg(props) {
  const { curUser } = useAuth();
  const fileUploader = useRef();

  const handleSubmit = () => {
    const message = document.getElementById("msg").value.trimEnd();
    displayNewMessage(message);
    sendMessage(message);
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
  const handleFileUpload = () => {
    fileUploader.current.click();
  };
  const displayNewMessage = (message) => {
    document.getElementById("msg").value = "";
    props.displayNewMessage(message, curUser.uid);
  };
  const sendMessage = (message) => {
    props.sendMessage(message, curUser.uid);
  };
  return (
    <div id="compose-msg" className="input-group">
      <div id="compose-msg-container">
        {/* <button className="btn" onClick={handleFileUpload}>
          <span class="material-symbols-outlined">image</span>
        </button>
        <input
          type="file"
          ref={fileUploader}
          style={{ display: "none" }}
        ></input> */}
        <textarea
          className="composeMsg-input form-control rounded-pill"
          aria-label="text input"
          placeholder="Message"
          rows="1"
          id="msg"
          onKeyDown={handleKeyPress}
        ></textarea>
        <button className="btn" type="submit" onClick={handleSubmit}>
          <span className="material-symbols-outlined">arrow_circle_up</span>
        </button>
      </div>
    </div>
  );
}

export default ComposeMsg;
