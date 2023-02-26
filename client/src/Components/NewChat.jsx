import React from "react";
import { useState } from "react";
import "./CSS/CurrentChat.css";
import "./CSS/NewChat.css";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import ComposeMsg from "./ComposeMsg";
import { useAuth } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function NewChat() {
  const [searchText, setSearchText] = useState({});
  const [participant, setParticipant] = useState();
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { curUser } = useAuth();
  const navigate = useNavigate();

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const createNewChat = (participantId, username) => {
    setParticipant({ id: participantId, username: username });
  };

  const handleClickClose = () => {
    setParticipant(null);
  };

  const handleSearchBarFocus = (isFocused) => {
    setSearchBarFocused(isFocused);
  };

  const handleNewMessage = async () => {
    curUser
      .getIdToken()
      .then((token) => {
        return fetch("/chats/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AuthToken: token,
          },
          body: JSON.stringify({
            selfFbUid: curUser.uid,
            otherId: participant.id,
          }),
        });
      })
      .then((res) => {
        if (res.ok) return res;
        throw res;
      })
      .then((data) => {
        return data.chatId;
        //navigate("../" + data.chatId, { state: { message: message } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="newChat">
      {/* header */}
      <div className="newChat__header">
        <div>
          <span>To: </span>
        </div>
        {!participant && (
          <div className="newChat__searchContainer">
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
        {participant && (
          <div>
            <span>{participant.username}</span>
            <button
              type="button"
              className="close btn"
              aria-label="Close"
              onClick={handleClickClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>
      {/* chat body */}
      <div className="newChat__body"></div>
      {participant && (
        <ComposeMsg
          handleNewMessage={handleNewMessage}
          chatId={null}
          other={participant.id}
        ></ComposeMsg>
      )}
    </div>
  );
}

export default NewChat;
