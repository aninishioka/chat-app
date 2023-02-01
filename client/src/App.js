import "./App.css";
import React from "react";
import CurrentChat from "./Components/CurrentChat";
import Sidebar from "./Components/Sidebar";
import NewChat from "./Components/NewChat";
import { Route, Routes } from "react-router-dom";
import { socket, SocketContext } from "./Contexts/SocketContext";
import { self, UserContext } from "./Contexts/UserContext";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <UserContext.Provider value={self}>
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
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
