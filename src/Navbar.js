import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { loginUrl } from "./spotify";
import "./Navbar.css";

function Navbar() {

  // to handle the mobile menu
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink exact to="/" className="navbar-logo">
            tune.[with]in
          </NavLink>
          <ul className={click ? "navbar-menu active" : "navbar-menu"}>
            <li className="navbar-item">
              <NavLink
                exact
                to="/"
                onClick={handleClick}
                className="navbar-link"
              >Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <a href={loginUrl} className="navbar-link" onClick={handleClick}>Listen</a>
            </li>
            <li className="navbar-item">
              <NavLink
                exact
                to="/focus"
                onClick={handleClick}
                className="navbar-link"
              >Focus
              </NavLink>
            </li>
          </ul>
          <div className="navbar-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
