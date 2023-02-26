import React, { useState } from "react";
import { useAuth } from "../Contexts/UserContext";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import "./CSS/NewChatHeader.css";

function NewChatHeader(props) {
  const { curUser } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [chatName, setChatName] = useState("");

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const createNewChat = (chatName) => {
    setChatName(chatName);
  };

  const handleClickClose = () => {
    setChatName(null);
  };

  const handleSearchBarFocus = () => {};

  return (
    <>
      <div>
        <span>To: </span>
      </div>
      {!chatName && (
        <div className="chat-search-container">
          <SearchBar
            onSearchTextChange={handleSearchTextChange}
            handleFocusChange={handleSearchBarFocus}
          ></SearchBar>
          <SearchDropdown
            searchText={searchText}
            createNewChat={createNewChat}
          ></SearchDropdown>
        </div>
      )}
      {chatName && (
        <div>
          <span>{chatName}</span>
          <button
            type="button"
            className="close-btn"
            aria-label="Close"
            onClick={handleClickClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
}

export default NewChatHeader;
