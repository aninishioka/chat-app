import React, { useEffect, useState } from "react";
import placeholderAvatar from "../Assets/placeholder-avatar.svg";

function ChatHeader(props) {
  const [avatar, setAvatar] = useState(placeholderAvatar);

  useEffect(() => {
    if (props.participant.avatar) {
      setAvatar(props.participant.avatar);
    }
  }, []);

  return (
    <div className="chat-header d-flex align-items-center">
      <div className="mr-1" style={{ width: 45 }}>
        <img
          src={avatar}
          className="rounded-circle"
          style={{ width: 36, height: 36 }}
        ></img>
      </div>
      <span>{props.participant.username}</span>
    </div>
  );
}

export default ChatHeader;
