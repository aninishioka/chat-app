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
        <Route path="/chats">
          <Route
            path="nigel"
            element={<CurrentChat name="Nigel"></CurrentChat>}
          ></Route>
          <Route
            path="ryan"
            element={<CurrentChat name="Ryan"></CurrentChat>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
