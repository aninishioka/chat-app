import React from "react";
import "./CSS/ComposeMsg.css";

function ComposeMsg(props) {
  const handleClick = () => {
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
