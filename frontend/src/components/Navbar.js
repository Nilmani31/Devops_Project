
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
 

const Navbar = ({ handleLogout }) => {
  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>S😉ulTune</h1>
      </div>

      <div className="navbar-center">
        <h1>Live more, worry less.🤞😎❤️❤️</h1>
        
      </div>

      <div className="navbar-right">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/add-quote" className="nav-link">
          Quote
        </Link>
        
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <Link to="/settings" className="nav-link">
          Settings
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
