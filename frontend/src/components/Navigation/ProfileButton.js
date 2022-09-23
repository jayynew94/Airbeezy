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
          <i id="left-icon" class=" fas fa-sharp fa-solid fa-bars "></i>
          <i id="right-icon" className="fas fa-user-circle user_icon fa-2x"></i>
        </button>
        

        {showMenu && (
          <div className="dropDizzy">
          {/* <div className="profile-dropdown"> */}
            <div className="droptext">Hello, {user.username}</div>
            <div className="droptext">User Profile: {user.email}</div>
            <div className="droptext">
              <NavLink exact to={`/spots/current`}>
                <button>My Spots</button>
              </NavLink>
            </div>
            <div className="droptext">
              <NavLink exact to={`/reviews/current`}>
                <button>My Reviews</button>
              </NavLink>
            </div>
            <div className="droptext">
              <button onClick={logout}>Log Out</button>
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
