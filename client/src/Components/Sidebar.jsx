import React from "react";
import ChatList from "./ChatList";
import "./CSS/Sidebar.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Signout from "./Signout";

function Sidebar() {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <div className="sidebar">
      {/* header */}
      <div className="sidebar__header">
        <h2>Chats</h2>
        <button className="sidebar__newChatBtn btn">
          <Link to="chats/new">
            <span className="material-symbols-outlined">edit_square</span>
          </Link>
        </button>
      </div>
      {/* search */}
      <SearchBar
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
      ></SearchBar>
      {/* convo list */}
      <ChatList searchText={searchText}></ChatList>
      <Signout></Signout>
    </div>
  );
}

export default Sidebar;
