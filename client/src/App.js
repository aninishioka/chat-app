import "./App.css";
import React from "react";
import CurrentChat from "./Components/CurrentChat";
import Sidebar from "./Components/Sidebar";
import NewChat from "./Components/NewChat";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div className="app">
      {/* sidebar */}
      <HomePage></HomePage>
    </div>
  );
}

export default App;
