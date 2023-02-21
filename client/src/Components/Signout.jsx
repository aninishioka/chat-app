import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/Signout.css";

function Signout() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleClick = async () => {
    setLoading(true);
    logout();
    setLoading(false);
  };

  return (
    <div className="signout__button__container">
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
