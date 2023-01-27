import React from "react";
import "./CSS/ChatList.css";
import Chat from "./Chat";

function ChatList(props) {
  const filterChatList = () => {
    const filteredList = [];
    if (typeof props.chats !== "undefined" && Array.isArray(props.chats)) {
      props.chats.forEach((chat) => {
        if (chat.name.toLowerCase().includes(props.searchText.toLowerCase())) {
          let lastMsg =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1][1]
              : "";
          filteredList.push(
            <Chat key={chat.name} name={chat.name} lastMsg={lastMsg}></Chat>
          );
        }
      });
    }
    return filteredList;
  };
  return <div className="chatList">{filterChatList()}</div>;
}

export default ChatList;
