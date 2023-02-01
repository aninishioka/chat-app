import React from "react";
import "./CSS/TextBubble.css";

function TextBubble(props) {
  const sender = props.senderIsSelf ? "self" : "other";
  return (
    <div className={"textBubble rounded align-middle " + sender}>
      <span className="textBubble__message">{props.message}</span>
    </div>
  );
}

export default TextBubble;
