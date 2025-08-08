// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaSpotify } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/search', label: 'Search', icon: <FaSearch /> },
   { path: '/library', label: 'Your Library', icon: <FaBook /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <FaSpotify className="spotify-icon" />
        <span className="brand-name">Spotify</span>
      </div>

      <nav className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={toggleSidebar} // Close menu on mobile
            className={location.pathname === link.path ? 'active' : ''}
          >
            <span className="icon">{link.icon}</span>
            <span className="label">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
