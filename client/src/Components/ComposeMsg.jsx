import React from "react";
import "./CSS/ComposeMsg.css";

function ComposeMsg(props) {
  const handleClick = () => {
    displayNewMessage();
  };
  const handleKeyPress = (e) => {
    if (e.shiftKey && e.keyCode == 13) return;
    if (e.keyCode == 13) {
      e.preventDefault();
      displayNewMessage();
    }
  };
  const displayNewMessage = () => {
    const msg = document.getElementById("msg").value;
    if (msg) {
      document.getElementById("msg").value = "";
      props.displayNewMessage(msg);
    }
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
