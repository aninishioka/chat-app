import React, { Component } from "react";
import "./CSS/ChatList.css";
import Chat from "./Chat";

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.filterChatList = this.filterChatList.bind(this);
  }
  state = {};

  chats = [
    { name: "Nigel", lastMsg: "hey" },
    { name: "Ryan", lastMsg: "?" },
  ];

  filterChatList() {
    const filteredList = [];
    this.chats.forEach((chat) => {
      if (
        chat.name.toLowerCase().includes(this.props.searchText.toLowerCase())
      ) {
        console.log(chat);
        filteredList.push(
          <Chat name={chat.name} lastMsg={chat.lastMsg}></Chat>
        );
      }
    });
    return filteredList;
  }

  render() {
    const filteredList = this.filterChatList();

    return (
      <div className="chatList">
        {/* chats */} {filteredList}
      </div>
    );
  }
}

export default ChatList;
