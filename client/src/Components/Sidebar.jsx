import React, { Component } from "react";
import ChatList from "./ChatList";
import "./CSS/Sidebar.css";
import SearchBar from "./SearchBar";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }
  state = {
    searchText: "",
  };

  handleSearchTextChange(searchText) {
    this.setState({ searchText: searchText });
  }

  render() {
    return (
      <div className="sidebar">
        {/* header */}
        <div className="sidebar__header">
          <h2>Chats</h2>
          <button className="sidebar__newChatBtn btn">
            <span className="material-symbols-outlined">edit_square</span>
          </button>
        </div>
        {/* search */}
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.handleSearchTextChange}
        ></SearchBar>
        {/* convo list */}
        <ChatList
          searchText={this.state.searchText}
          chats={this.props.chats}
        ></ChatList>
      </div>
    );
  }
}

export default Sidebar;
