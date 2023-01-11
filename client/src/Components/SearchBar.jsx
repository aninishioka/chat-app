import React, { Component } from "react";
import "./CSS/SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  state = {};
  render() {
    return (
      <div className="searchBar input-group">
        <label></label>
        <input
          className="searchBar__input form-control rounded-pill border-0 bg-light"
          id="search"
          type="search"
          aria-label="text input"
          placeholder="Search"
          onChange={this.handleSearchTextChange}
        ></input>
      </div>
    );
  }
}

export default SearchBar;
