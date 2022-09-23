// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="mainDiv">
      <div className="loginbar">
        <h4>Please log In</h4>
      </div>

      <div className="login-title">
        <h3>Welcome to AirBeezy</h3>
      </div>

      <form className="login-page" onSubmit={handleSubmit}>
        <div className="errors">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>

        <div className="loginInput">
          <div>
            <input
              className="username"
              type="text"
              value={credential}
              placeholder="Username or email"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div >
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="login-btn" type="submit">
              Log In
            </button>
            <button className="login-btn">
              Login as DEMO-USER
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
