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
      .then(() => {
        setError("");
        navigate("../");
      })
      .catch((err) => {
        setError("Could not log in");
      });
    setLoading(false);
  };

  return (
    <div className="loginPage">
      <form className="loginPage__form">
        {error && (
          <div id="alert" className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <input
          className="form__input rounded border border-primary-subtle"
          type="email"
          id="login__email"
          placeholder="Email"
          ref={emailRef}
          onKeyDown={handleKeyPress}
        ></input>
        <br />
        <input
          className="form__input rounded border border-primary-subtle"
          type="password"
          id="login__password"
          placeholder="Password"
          ref={passwordRef}
          onKeyDown={handleKeyPress}
        ></input>
        <br />
        <div className="formButtons">
          <button
            disabled={loading}
            className="border-0 rounded-pill"
            id="login__submit"
            onClick={handleSubmit}
          >
            Log in
          </button>
          <Link to="/signup">
            <button className="border-0" id="toSignup">
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
