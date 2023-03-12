import React from "react";
import "./CSS/ChatList.css";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useAuth } from "../Contexts/UserContext";
import { SocketContext } from "../Contexts/SocketContext";

function ChatList(props) {
  const [chats, setChats] = useState([]);
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);

  useEffect(() => {
    curUser
      .getIdToken()
      .then((token) => {
        return fetch(
          "/chats/previews?" +
            new URLSearchParams({
              uid: curUser.uid,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              AuthToken: token,
            },
          }
        );
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

    return () => {
      socket.off("new-message");
    };
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
        let participant = null;
        for (let user in chat.participants) {
          if (chat.participants[user].firebaseUid !== curUser.uid)
            participant = chat.participants[user];
        }
        if (
          props.searchText === "" ||
          participant.username
            .toLowerCase()
            .includes(props.searchText.toLowerCase())
        ) {
          filteredList.push(
            <ChatCard
              key={chat._id}
              chat={chat}
              participant={participant}
            ></ChatCard>
          );
        }

        /* if (chat.name.toLowerCase().includes(props.searchText.toLowerCase())) {
          filteredList.push(
            <Chat key={chat.name} name={chat.name} lastMsg={lastMsg}></Chat>
          );
        } */
      });
    }
    return filteredList;
  };
  return <div className="chat-list pt-2">{filterChatList()}</div>;
}

export default ChatList;
