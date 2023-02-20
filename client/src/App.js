import "./App.css";
import React from "react";
import PrivateRoute from "./Components/PrivateRoute";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      {/* sidebar */}

      <Routes>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
