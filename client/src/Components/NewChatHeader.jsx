import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import "./CSS/NewChatHeader.css";

function NewChatHeader(props) {
  const [searchText, setSearchText] = useState("");
  const [chatName, setChatName] = useState("");

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const setNewChat = (chatName) => {
    setChatName(chatName);
    props.setChatName(chatName);
  };

  const handleClickClose = () => {
    setChatName(null);
    props.setChatName(null);
  };

  const handleSearchBarFocus = () => {};

  return (
    <>
      <div>
        <span style={{ display: "inline-block" }} className="mr-2">
          To:
        </span>
      </div>
      {!chatName && (
        <div className="chat-search-container">
          <SearchBar
            onSearchTextChange={handleSearchTextChange}
            handleFocusChange={handleSearchBarFocus}
          ></SearchBar>
          <SearchDropdown
            searchText={searchText}
            setChatName={setNewChat}
            setParticipant={props.setParticipant}
          ></SearchDropdown>
        </div>
      )}
      {chatName && (
        <div className="card text-bg-light ml-2">
          <div className="card-body px-2 py-0">
            <span>{chatName}</span>
            <button
              type="button"
              className="btn close-btn px-1"
              aria-label="Close"
              onClick={handleClickClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NewChatHeader;
