import React from "react";

function ChatHeader(props) {
  return <div className="chat-header">{props.participant.username}</div>;
}

export default ChatHeader;
