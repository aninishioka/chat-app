import React from "react";
import "./CSS/TextBubble.css";

function TextBubble(props) {
  const sender = props.senderIsSelf ? "self" : "other";
  return (
    <div className={"text-bubble rounded align-middle " + sender}>
      <span className="text-bubble-message">{props.message}</span>
    </div>
  );
}

export default TextBubble;
