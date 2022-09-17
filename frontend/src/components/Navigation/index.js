// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import './navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink  to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="NavBarContainer">
      <div className="NavBar">
        <NavLink exact to="/">
          Home
        </NavLink>
        <div className="NavRightSide">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
