import "./App.css";
import CurrentChat from "./Components/CurrentChat";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/chats")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      {/* sidebar */}
      <Sidebar chats={data.chats}></Sidebar>

      {/* current conversation */}
      <Routes>
        <Route path="/chats">
          <Route path=":name" element={<CurrentChat></CurrentChat>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
