import React, { Component } from "react";
import "./CSS/ChatList.css";
import Chat from "./Chat";

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.filterChatList = this.filterChatList.bind(this);
  }
  state = {};

  filterChatList() {
    const filteredList = [];
    if (typeof this.props.chats !== "undefined") {
      this.props.chats.forEach((chat) => {
        if (
          chat.name.toLowerCase().includes(this.props.searchText.toLowerCase())
        ) {
          filteredList.push(
            <Chat
              key={chat.name}
              name={chat.name}
              lastMsg={chat.lastMsg}
            ></Chat>
          );
        }
      });
    }
    return filteredList;
  }

  render() {
    const filteredList = this.filterChatList();
    return <div className="chatList">{filteredList}</div>;
  }
}

export default ChatList;
