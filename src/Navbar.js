import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <a
        href="https://github.com/harshit-070/weatherApp"
        target="_blank"
        rel="noreferrer"
      >
        <button className="button navbar-button">
          <img src="./github.png" className="logo" alt="github-logo" /> GitHub
        </button>
      </a>

      <a href="https://wa.me/+917017657628" target="_blank" rel="noreferrer">
        <button className="button navbar-button">
          <img src="./whatsapp.svg" className="logo" alt="github-logo" />{" "}
          Contact Me
        </button>
      </a>
    </div>
  );
}

export default Navbar;
