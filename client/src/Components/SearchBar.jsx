import React from "react";
import "./CSS/SearchBar.css";

function SearchBar(props) {
  const handleSearchTextChange = (e) => {
    props.onSearchTextChange(e.target.value);
  };
  return (
    <div className="searchBar input-group">
      <label></label>
      <input
        className="searchBar__input form-control rounded-pill border-0 bg-light"
        id="search"
        type="search"
        aria-label="text input"
        placeholder="Search"
        onChange={handleSearchTextChange}
      ></input>
    </div>
  );
}

export default SearchBar;
