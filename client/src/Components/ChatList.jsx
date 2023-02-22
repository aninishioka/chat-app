import React from "react";
import "./CSS/ChatList.css";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useAuth, UserContext } from "../Contexts/UserContext";
import { SocketContext } from "../Contexts/SocketContext";

function ChatList() {
  const [chats, setChats] = useState([]);
  const self = useContext(UserContext);
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);

  useEffect(() => {
    curUser
      .getIdToken()
      .then((token) => {
        return fetch("/chats/previews", {
          method: "POST",
          headers: {
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
          if (chat.participants[user].userId !== curUser.uid)
            other = chat.participants[user];
        }
        if (other === null) return;
        filteredList.push(
          <ChatCard
            key={chat._id}
            chatId={chat._id}
            userId={other.participantId}
            name={other.username}
            lastMsg={chat.lastMessage}
            lastMsgBy={chat.lastMessageSender}
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
