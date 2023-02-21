import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/SignupPage.css";

function SignupPage() {
  const emailRef = useRef();
  const confirmEmailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (emailRef.current.value !== confirmEmailRef.current.value) {
      setError("Emails do not match.");
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match.");
    } else {
      signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then(() => {
          setError("");
          navigate("../");
        })
        .catch((err) => {
          setError("Could not create account. Please try again later.");
        });
    }
    setLoading(false);
  };

  return (
    <div className="signupPage">
      <form className="signupPage__form">
        {error && (
          <div id="alert" className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <input
          className="form__input rounded"
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          ref={emailRef}
          required
        ></input>
        <br />
        <input
          className="form__input rounded"
          id="confirm_email"
          type="email"
          placeholder="Confirm email address"
          ref={confirmEmailRef}
          required
        ></input>
        <br />
        <input
          className="form__input rounded"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
          required
        ></input>
        <br />
        <input
          className="form__input rounded"
          id="password"
          type="password"
          placeholder="Password"
          minLength="8"
          ref={passwordRef}
          required
        ></input>
        <input
          className="form__input rounded"
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required
        ></input>
        <br />
        <button
          disabled={loading}
          className="border-0 rounded-pill"
          id="submit"
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
