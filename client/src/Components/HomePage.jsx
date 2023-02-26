import React from "react";
import "./CSS/HomePage.css";
import CurrentChat from "./CurrentChat";
import Sidebar from "./Sidebar";
import NewChat from "./NewChat";
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
          {/* <Route path=":chatId" element={<CurrentChat></CurrentChat>}></Route>
          <Route path="new" element={<NewChat></NewChat>}></Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default HomePage;
