import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import "./CSS/SignupPage.css";

function SignupPage() {
  const emailRef = useRef();
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

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match.");
    } else {
      signup(emailRef.current.value, passwordRef.current.value)
        .then(async (userCredential) => {
          const token = await userCredential.user.getIdToken();
          await fetch("/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              AuthToken: token,
            },
            body: JSON.stringify({
              username: usernameRef.current.value,
              user_id: userCredential.user.uid,
            }),
          });
          setError("");
          navigate("../");
        })
        .catch((err) => {
          setError("Could not create account.");
        });
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4"> Sign up</h2>
          {error && (
            <div id="alert" className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <input
            className="form-control mb-4"
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            ref={emailRef}
            required
          ></input>
          <input
            className="form-control mb-4"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            required
          ></input>
          <input
            className="form-control mb-2"
            id="password"
            type="password"
            placeholder="Password"
            minLength="8"
            ref={passwordRef}
            required
          ></input>
          <input
            className="form-control"
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            required
          ></input>
          <br />
          <button
            disabled={loading}
            className="btn btn-primary w-100"
            id="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="w-100 text-center mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;
