import React from "react";
import { useState } from "react";
import "./CSS/CurrentChat.css";
import "./CSS/NewChat.css";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";

function NewChat() {
  const [searchText, setSearchText] = useState({});

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };
  return (
    <div className="newChat">
      {/* header */}
      <div className="newChat__header">
        <span>To: </span>
        <div className="newChat__searchContainer">
          {/*<input
            className="newChat__userSearch"
            autoFocus
            onChange={handleSearchTextChange}
          ></input>*/}
          <SearchBar onSearchTextChange={handleSearchTextChange}></SearchBar>
          <SearchDropdown searchText={searchText}></SearchDropdown>
        </div>
      </div>
      {/* chat body */}
      <div className="newChat__body"></div>
    </div>
  );
}

export default NewChat;
