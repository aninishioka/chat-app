import React from "react";
import "./CSS/TextBubble.css";

function TextBubble(props) {
  return (
    <div className={"textBubble rounded align-middle " + props.sender}>
      <span className="textBubble__message">{props.message}</span>
    </div>
  );
}

export default TextBubble;
