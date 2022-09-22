import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

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
      <div>
        <button className="btn" onClick={create}>
          Become a Host
        </button>
        
          <button  className='userBtn'onClick={openMenu}>
            <i className="fas fa-solid fa-bars"></i>
            <i className="fas fa-user-circle user_icon"></i>
          </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>Hello, {user.username}</li>
            <li>User Profile: {user.email}</li>
            <li>
              <NavLink to={`/spots/current`}>
              <button>My Spots</button>
              </NavLink>
            </li>
            <li>
              <button>My Reviews</button>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
