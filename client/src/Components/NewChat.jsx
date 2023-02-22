import React from "react";
import { useState } from "react";
import "./CSS/CurrentChat.css";
import "./CSS/NewChat.css";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import ComposeMsg from "./ComposeMsg";

function NewChat() {
  const [searchText, setSearchText] = useState({});
  const [participant, setParticipant] = useState();

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const createNewChat = (participant) => {
    setParticipant(participant);
  };

  const handleNewMessage = () => {};

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
          {!participant && (
            <SearchDropdown
              searchText={searchText}
              createNewChat={createNewChat}
            ></SearchDropdown>
          )}
        </div>
      </div>
      {/* chat body */}
      <div className="newChat__body"></div>
      {participant && (
        <ComposeMsg
          //handleNewMessage={handleNewMessage}
          chatId={null}
          other={participant._id}
        ></ComposeMsg>
      )}
    </div>
  );
}

export default NewChat;
