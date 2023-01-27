import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./CSS/SearchDropdown.css";
import UserCard from "./UserCard";

function SearchDropdown(props) {
  const [data, setData] = useState({});
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
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createUserCards = () => {
    if (
      typeof data !== "undefined" &&
      Array.isArray(data) &&
      props.searchText !== null &&
      props.searchText !== ""
    ) {
      return data.map((user) => {
        return (
          <UserCard
            key={user._id}
            name={user.name}
            userId={user._id}
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
