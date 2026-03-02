import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <span className="logo-arc">Arc</span>
          <span className="logo-lancer">Lancer</span>
        </div>

        {/* Right Side Menu */}
        <div className="nav-buttons">
          <button className="nav-link">
            Team Member
          </button>

          <button className="btn-outline">
            Hire Talent
          </button>

          <button className="btn-primary">
            Join as Freelancer
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;