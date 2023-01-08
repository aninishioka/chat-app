import React, { Component } from "react";
import ChatList from "./ChatList";
import "./CSS/Sidebar.css";
import SearchBar from "./SearchBar";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div className="sidebar">
        {/* header */}
        <div className="sidebar__header">
          <h2>Chats</h2>
          <button className="sidebar__newChatBtn btn">
            <span className="material-symbols-outlined">edit_square</span>
          </button>
        </div>
        {/* search. use datalist? */}
        <SearchBar></SearchBar>
        {/* convo list */}
        <ChatList></ChatList>
      </div>
    );
  }
}

export default Sidebar;
