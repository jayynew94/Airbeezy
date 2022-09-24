// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './signupform.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="SignDiv">
      <form className="signupPage" onSubmit={handleSubmit}>
        <div className="signupbar">
          <h3 className="signupTitle">SignUp</h3>
        </div>
        <div className="Eblock">
          <ul>
            {errors.map((error, idx) => (
              <li className="signuperror" key={idx}>
                {error}
              </li>
            ))}
          </ul>
        </div>
        <div className="signupinput">
          <div className="signupPad">
            <input
              className="signupBlocks"
              placeholder="FirstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="signupPad">
            <input
              className="signupBlocks"
              placeholder="LastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="signupPad">
            <input
              className="signupBlocks"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signupPad">
            <input
              className="signupBlocks"
              placeholder="UserName"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="signupPad">
            <input
              className="signupBlocks"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signupPad">
            <input
              className="signupBlocks"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="bigsignupbtn" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );

}

export default SignupForm;
