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

  //retrieve all chats user is participating in
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

    //set event listener for new incoming messages.
    socket.on("new-message", (chat) => {
      handleNewMessage(chat);
    });

    return () => {
      socket.off("new-message");
    };
  }, []);

  //on new message, should update chat list so chat with most recent activity should move to top of chat list.
  const handleNewMessage = (newChat) => {
    setChats((chats) => {
      const updatedChats = chats.filter((chat) => {
        return chat._id !== newChat._id;
      });
      return [newChat, ...updatedChats];
    });
  };

  //filter chat list when user enters search input into searchbar
  const filterChatList = () => {
    const filteredList = [];
    if (typeof chats !== "undefined" && Array.isArray(chats)) {
      chats.forEach((chat) => {
        let participant = null;
        for (let user in chat.participants) {
          if (chat.participants[user].user_id !== curUser.uid)
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
      });
    }
    return filteredList;
  };
  return (
    <div id="chat-list" className="pt-2">
      {filterChatList()}
    </div>
  );
}

export default ChatList;
