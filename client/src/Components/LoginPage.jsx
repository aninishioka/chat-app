import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/LoginPage.css";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (emailRef.current.value && passwordRef.current.value) {
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    login(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        setError("");
        navigate("../");
      })
      .catch((err) => {
        setError("Could not log in");
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <div id="login-page">
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Log In</h2>
          {error && (
            <div id="alert" className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <input
            className="form-control"
            type="email"
            id="login__email"
            placeholder="Email"
            ref={emailRef}
            onKeyDown={handleKeyPress}
          ></input>
          <br />
          <input
            className="form-control"
            type="password"
            id="login__password"
            placeholder="Password"
            ref={passwordRef}
            onKeyDown={handleKeyPress}
          ></input>
          <br />
          <button
            disabled={loading}
            className="btn btn-primary w-100"
            id="login__submit"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="w-100 text-center mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
