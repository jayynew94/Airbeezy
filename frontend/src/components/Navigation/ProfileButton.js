import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./navigation.css";


import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const create = e => {
  e.preventDefault()
  history.push('/newspot')
  }

  return (
    <div>
      <div className="rightdiv">
        <div className="DONTMOVE">
          <button className="btn" onClick={create}>
            Become a Host
          </button>
        </div>
        <div className="dropdiv">
          <button className="userbtn" onClick={openMenu}>
            <i id="left-icon" className=" fas fa-sharp fa-solid fa-bars "></i>
            <i
              id="right-icon"
              className="fas fa-user-circle user_icon fa-3x"
            ></i>
          </button>

          {showMenu && (
            <div className="dropDizzy">
              {/* <div className="profile-dropdown"> */}
              <div className="droptext helloUser">Hello, {user.username}</div>
              <div className="droptext">Profile: {user.email}</div>
              <div className="stretch">
                <NavLink className="linktext" exact to={`/spots/current`}>
                  My Spots
                </NavLink>
              </div>
              <div className="stretch">
                <NavLink className="linktext" exact to={`/reviews/current`}>
                  My Reviews
                </NavLink>
              </div>
              <div className="drop-text">
                <button className="logoutbutton" onClick={logout}>Log Out</button>
              </div>
              {/* </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
