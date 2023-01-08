import React, { Component } from "react";
import "./CSS/ChatList.css";
import Chat from "./Chat";

class ChatList extends Component {
  state = {};
  render() {
    return (
      <div className="chatList">
        {/* chats */}
        <Chat name="Nigel" lastMsg="hey"></Chat>
        <Chat name="Ryan" lastMsg="?"></Chat>
      </div>
    );
  }
}

export default ChatList;
