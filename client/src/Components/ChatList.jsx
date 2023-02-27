import React from "react";
import "./CSS/ChatList.css";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useAuth } from "../Contexts/UserContext";
import { SocketContext } from "../Contexts/SocketContext";

function ChatList() {
  const [chats, setChats] = useState([]);
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);

  useEffect(() => {
    curUser
      .getIdToken()
      .then((token) => {
        return fetch("/chats/previews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AuthToken: token,
          },
          body: JSON.stringify({
            firebaseUid: curUser.uid,
          }),
        });
      })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((chats) => {
        setChats(chats);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("new-message", (chat) => {
      handleNewMessage(chat);
    });
  }, []);

  const handleNewMessage = (newChat) => {
    setChats((chats) => {
      const updatedChats = chats.filter((chat) => {
        return chat._id !== newChat._id;
      });
      return [newChat, ...updatedChats];
    });
  };

  const filterChatList = () => {
    const filteredList = [];
    if (typeof chats !== "undefined" && Array.isArray(chats)) {
      chats.forEach((chat) => {
        let other = null;
        for (let user in chat.participants) {
          if (chat.participants[user].firebaseUid !== curUser.uid)
            other = chat.participants[user];
        }
        if (other === null) return;
        filteredList.push(
          <ChatCard
            key={chat._id}
            chatId={chat._id}
            userId={other.firebaseUid}
            username={other.username}
            lastMsg={chat.lastMessage}
            lastMsgBy={chat.lastMessageAuthor.firebaseUid}
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
  return <div className="chat-list">{filterChatList()}</div>;
}

export default ChatList;
