import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__header">
        <h1 className="navigation__title">STOIC TRAINING</h1>
        <p className="navigation__subtitle">DISCIPLINE BUILDS FREEDOM</p>
      </div>

      <ul className="navigation__links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/builder"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Program Builder
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-programs"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            My Programs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;