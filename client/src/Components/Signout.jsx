import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/Signout.css";

function Signout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    logout()
      .then(() => {
        setError("");
        navigate("./login");
      })
      .catch((err) => {
        setError("Could not log out.");
      });
    setLoading(false);
  };

  return (
    <div className="signout__button__container">
      {error && (
        <div id="alert" className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <button
        disabled={loading}
        className="btn btn-outline-secondary"
        onClick={handleClick}
      >
        Log out
      </button>
    </div>
  );
}

export default Signout;
