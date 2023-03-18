import "./App.css";
import React from "react";
import PrivateRoute from "./Components/PrivateRoute";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import { Route, Routes } from "react-router-dom";
import Onboarding from "./Components/Onboarding";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/onboarding" element={<Onboarding></Onboarding>} />
          <Route path="/*" element={<HomePage></HomePage>} />
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/signup" element={<SignupPage></SignupPage>} />
      </Routes>
    </div>
  );
}

export default App;
