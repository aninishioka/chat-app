import React from "react";
import { Link } from "react-router-dom";
import "./CSS/LoginPage.css";

function LoginPage() {
  return (
    <div className="loginPage">
      <form className="loginPage__form">
        <input
          className="form__input rounded border border-primary-subtle"
          type="text"
          id="login__username"
          placeholder="Username"
        ></input>
        <br />
        <input
          className="form__input rounded border border-primary-subtle"
          type="password"
          id="login__password"
          placeholder="Password"
        ></input>
        <br />
        <div className="formButtons">
          <input
            className="border-0 rounded-pill"
            id="login__submit"
            type="submit"
            value="Log in"
          ></input>
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
