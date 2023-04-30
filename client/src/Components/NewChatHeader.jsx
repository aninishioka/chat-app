import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import "./CSS/NewChatHeader.css";

function NewChatHeader(props) {
  const [searchText, setSearchText] = useState("");
  const [participant, setParticipant] = useState("");

  useEffect(() => {
    props.setParticipant(participant);
  }, [participant]);

  //search for other users on user search input
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  //deselect user
  const handleClickClose = () => {
    setParticipant(null);
  };

  const handleSearchBarFocus = () => {};

  return (
    <>
      <div>
        <span style={{ display: "inline-block" }} className="mr-2">
          To:
        </span>
      </div>
      {!participant && (
        <div className="chat-search-container">
          <SearchBar
            onSearchTextChange={handleSearchTextChange}
            handleFocusChange={handleSearchBarFocus}
          ></SearchBar>
          <SearchDropdown
            searchText={searchText}
            setParticipant={setParticipant}
            setChatId={props.setChatId}
          ></SearchDropdown>
        </div>
      )}
      {participant && (
        <div className="card text-bg-light ml-2">
          <div className="card-body px-2 py-0">
            <span>{participant.username}</span>
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
