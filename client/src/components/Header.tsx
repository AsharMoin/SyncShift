import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const location = useLocation();

  return (
    <nav className="header">
      <a href="/login">
        <img src="./favicon.ico" alt="Logo" className="home-icon" />
      </a>
      <div className="navigation">
        <NavLink to="/help">Help</NavLink>
        {location.pathname !== "/login" && <NavLink to="/login">Logout</NavLink>}
      </div>
    </nav>
  );
}
