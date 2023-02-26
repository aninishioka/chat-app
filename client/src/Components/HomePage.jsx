import React from "react";
import "./CSS/HomePage.css";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";

function HomePage() {
  return (
    <div className="homePage">
      {/* sidebar */}
      <Sidebar></Sidebar>

      {/* current conversation */}
      <Routes>
        <Route path="/chats">
          <Route path=":id" element={<Chat></Chat>}></Route>
          <Route path="new" element={<Chat></Chat>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default HomePage;
