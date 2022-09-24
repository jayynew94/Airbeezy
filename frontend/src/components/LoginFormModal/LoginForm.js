// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [clickDemo, setClickDemo] = useState(false)
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

   
    let loginUser = {};

    if(clickDemo === true){
      loginUser = { credential:"Demo-lition", password:"password" };
    }else loginUser = { credential, password };

    return dispatch(sessionActions.login(loginUser)).catch(
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
        <div className="loginerror">
          <ul className="loginerror">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>

        <div className="loginInput">
          <div className="loginpad">
            <input
              className="username"
              type="text"
              value={credential}
              placeholder="Username or email"
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          <div className="loginpad">
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={() => setClickDemo(false)}
              className="login-btn"
              type="submit"
            >
              Log In
            </button>
            <button
              onClick={() => setClickDemo(true)}
              className="login-btn"
              type="submit"
            >
              Login as DEMO-USER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
