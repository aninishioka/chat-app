import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/SignupPage.css";
import PrivateRouter from "./PrivateRoute";

function SignupPage() {
  const emailRef = useRef();
  const confirmEmailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const alert = useRef();
  const { signup, user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (infoIsValid()) {
      try {
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        sendUserToDB(usernameRef.current.value, emailRef.current.value);
        setError("");
        navigate("../");
      } catch {
        setError("Could not create account");
      }
    }

    setLoading(false);
  };

  const infoIsValid = () => {
    return (
      passwordRef.current.value === confirmPasswordRef.current.value &&
      emailRef.current.value === confirmEmailRef.current.value
    );
  };

  const sendUserToDB = (username, email) => {
    user.getIdToken().then((token) => {
      fetch("/users/new", {
        method: "POST",
        headers: {
          AuthToken: token,
        },
        body: {
          username: username,
          email: email,
        },
      });
    });
  };

  const fieldsMatch = (className) => {
    const field = document.getElementById(className);
    const confirmField = document.getElementById(`confirm_${className}`);

    if (field.value !== confirmField.value) {
      confirmField.setCustomValidity(`${className}s don't match`);
      setError(`${className}s don't match. Could not create account`);
      confirmField.value = "";
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const alert = document.getElementById("alert");
    if (error === "") alert.style.visibility = "hidden";
    else alert.style.visibility = "visible";
  }, [error]);

  return (
    <div className="signupPage">
      <form
        className="signupPage__form"
        action="/users/new"
        method="POST"
        enctype="multipart/form-data"
      >
        <div id="alert" className="alert alert-danger" role="alert" ref={alert}>
          {error}
        </div>
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
          //pattern="[A-Za-z0-9\-_\.]"
          title="Only letters, numbers, certain special characters allowed"
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
          //pattern="[^\s]"
          title="No white space allowed."
          ref={passwordRef}
          required
        ></input>
        <input
          className="form__input rounded"
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
          title="No white space allowed."
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
