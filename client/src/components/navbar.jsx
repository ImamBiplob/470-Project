import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Medical
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/doctors">
                Doctors
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/blood-banks">
                Blood-Banks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ambulances">
                Ambulances
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/seats">
                Seats
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/medicines">
                Medicines
              </NavLink>
            </li>
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user-profile">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Log Out
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
