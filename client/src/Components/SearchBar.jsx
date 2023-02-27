import React from "react";
import "./CSS/SearchBar.css";

function SearchBar(props) {
  const handleSearchTextChange = (e) => {
    props.onSearchTextChange(e.target.value);
  };

  const handleFocus = () => {
    //props.handleFocusChange(true);
  };

  const handleBlur = () => {
    //props.handleFocusChange(false);
  };

  return (
    <>
      <label></label>
      <input
        className="form-control search-bar-input" //"searchBar__input form-control rounded-pill border-0 bg-light"
        id="search"
        type="search"
        aria-label="Search"
        placeholder="Search"
        onChange={handleSearchTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></input>
    </>
  );
}

export default SearchBar;
