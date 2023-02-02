import React from "react";
import "./CSS/ChatList.css";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

function ChatList() {
  const [chats, setChats] = useState([]);
  const self = useContext(UserContext);

  useEffect(() => {
    fetch("/chats/previews")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((chats) => setChats(chats))
      .catch((err) => console.log(err));
  }, []);

  const filterChatList = () => {
    const filteredList = [];
    if (typeof chats !== "undefined" && Array.isArray(chats)) {
      chats.forEach((chat) => {
        let other;
        for (let user in chat.participants) {
          if (chat.participants[user].userId !== self)
            other = chat.participants[user];
        }
        filteredList.push(
          <ChatCard
            key={chat._id}
            userId={other.userId}
            name={other.name}
            lastMsg={chat.lastMessage}
          ></ChatCard>
        );
        /* if (chat.name.toLowerCase().includes(props.searchText.toLowerCase())) {
          filteredList.push(
            <Chat key={chat.name} name={chat.name} lastMsg={lastMsg}></Chat>
          );
        } */
      });
    }
    return filteredList;
  };
  return <div className="chatList">{filterChatList()}</div>;
}

export default ChatList;
