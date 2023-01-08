import "./App.css";
import CurrentChat from "./Components/CurrentChat";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      {/* sidebar */}
      <Sidebar></Sidebar>

      {/* current conversation */}
      <Routes>
        <Route
          path="/chats/nigel"
          element={<CurrentChat name="Nigel"></CurrentChat>}
        ></Route>
        <Route
          path="/chats/ryan"
          element={<CurrentChat name="Ryan"></CurrentChat>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
