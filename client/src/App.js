import "./App.css";
import React from "react";
import CurrentChat from "./Components/CurrentChat";
import Sidebar from "./Components/Sidebar";
import NewChat from "./Components/NewChat";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      {/* sidebar */}
      <Sidebar></Sidebar>

      {/* current conversation */}
      <Routes>
        <Route path="/chats">
          <Route path=":name" element={<CurrentChat></CurrentChat>}></Route>
          <Route path="new" element={<NewChat></NewChat>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
