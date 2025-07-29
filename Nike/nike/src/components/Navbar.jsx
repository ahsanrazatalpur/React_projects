import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        {/* Light Theme: Black Logo */}
        <img
          src="https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png"
          alt="Nike Logo Black"
          className="logo light-logo"
        />

        {/* Dark Theme: White Logo */}
        <img
          src="https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png"
          alt="Nike Logo White"
          className="logo dark-logo"
        />
      </div>


      {/* Navigation Links */}
      <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><a href="#">MENU</a></li>
        <li><a href="#collection">COLLECTION</a></li>
        <li><a href="#gallery">GALLERY</a></li>
        <li><a href="#about">ABOUT</a></li>
      </ul>

      {/* Theme Toggle & Login */}
      <div className="nav-right">
        <ThemeToggle />
        <button className="login-btn">LOGIN</button>
      </div>

      {/* Hamburger for mobile */}
      <div
        className="hamburger"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
