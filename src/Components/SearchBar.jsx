import React, { Component } from "react";
import "./CSS/SearchBar.css";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <div className="searchBar input-group">
        <input
          className="searchBar__input form-control rounded-pill border-0 bg-light"
          type="text"
          aria-label="text input"
          placeholder="Search"
        ></input>
      </div>
    );
  }
}

export default SearchBar;
