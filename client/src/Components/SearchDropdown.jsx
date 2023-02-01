import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./CSS/SearchDropdown.css";
import UserCard from "./UserCard";

function SearchDropdown(props) {
  const [contacts, setContacts] = useState({});
  useEffect(() => {
    if (props.searchText === null || props.searchText === "") return;
    fetch(
      "/users?" +
        new URLSearchParams({
          name: props.searchText,
        })
    )
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
  }, []);

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
            name={contact.name}
            userId={contact._id}
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
