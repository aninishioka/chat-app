import React from "react";
import "./CSS/ChatList.css";
import Chat from "./Chat";

function ChatList(props) {
  const filterChatList = () => {
    if (typeof props.chats !== "undefined" && Array.isArray(props.chats)) {
      return props.chats.map((chat) => {
        if (chat.name.toLowerCase().includes(props.searchText.toLowerCase())) {
          let lastMsg =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1][1]
              : "";
          return (
            <Chat key={chat.name} name={chat.name} lastMsg={lastMsg}></Chat>
          );
        }
      });
    }
  };
  return <div className="chatList">{filterChatList()}</div>;
}

export default ChatList;
