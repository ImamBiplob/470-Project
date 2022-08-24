import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2 text-muted">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2 text-muted">
            Features
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2 text-muted">
            Pricing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2 text-muted">
            FAQs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2 text-muted">
            About
          </NavLink>
        </li>
      </ul>
      <p className="text-center text-muted">© 2022 Company, Inc</p>
    </footer>
  );
};

export default Footer;
