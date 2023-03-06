import { getAuth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import "./CSS/SearchDropdown.css";
import UserCard from "./UserCard";

function SearchDropdown(props) {
  const [contacts, setContacts] = useState({});
  const userContext = useRef(getAuth());

  useEffect(() => {
    if (!userContext.current.currentUser) return;
    userContext.current.currentUser
      .getIdToken()
      .then((token) => {
        return fetch(
          "/participants?" +
            new URLSearchParams({
              searchText: props.searchText,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              AuthToken: token,
            },
          }
        );
      })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((contacts) => {
        setContacts(contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.searchText]);

  const createUserCards = () => {
    if (
      typeof contacts !== "undefined" &&
      Array.isArray(contacts) &&
      props.searchText !== null &&
      props.searchText !== ""
    ) {
      return contacts.map((contact) => {
        return (
          <UserCard
            key={contact._id}
            username={contact.username}
            userUid={contact.firebaseUid}
            setChatName={props.setChatName}
            setParticipant={props.setParticipant}
          ></UserCard>
        );
      });
    }
  };

  return (
    <div className="dropdown rounded list-group shadow-sm">
      {createUserCards()}
    </div>
  );
}

export default SearchDropdown;
