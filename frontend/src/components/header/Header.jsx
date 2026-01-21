import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="header">
        <nav>
          <ul>
            <li>
              <NavLink className="link" to="/">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink className="link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
