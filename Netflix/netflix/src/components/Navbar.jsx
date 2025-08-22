import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import MovieSearch from "./MovieSearch";
import LoginPopup from "./LoginPopup";

const DEFAULT_AVATAR =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

const Navbar = ({ movies, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();

  useEffect(() => {
    const savedUser = localStorage.getItem("netflixUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("netflixUser");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("netflixUser", JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("netflixUser");
    setShowUserMenu(false);
    setIsOpen(false); // make sure mobile menu closes too
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (isOpen) setIsOpen(false);
  };

  const closeSearch = () => setShowSearch(false);

  const handleAvatarError = (e) => (e.target.src = DEFAULT_AVATAR);

  const onNavClick = (category) => {
    if (onCategorySelect) onCategorySelect(category);
    setIsOpen(false);
    setShowSearch(false);
    setShowUserMenu(false);
  };

  const categories = ["home", "tv-shows", "movies", "new-popular", "my-list"];

  return (
    <>
      <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
              className="h-6 md:h-8"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className="hover:text-red-500 focus:outline-none"
                onClick={() => onNavClick(cat)}
              >
                {cat === "new-popular"
                  ? "New & Popular"
                  : cat === "my-list"
                  ? "My List"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Right Side (Desktop + Mobile) */}
          <div className="flex items-center space-x-3 relative">
            <FaSearch
              className="cursor-pointer hover:text-red-500"
              size={20}
              onClick={toggleSearch}
            />

            {user ? (
              <div className="relative">
                <img
                  src={user.avatar || DEFAULT_AVATAR}
                  alt={user.fullName || user.username || "User avatar"}
                  onError={handleAvatarError}
                  className="h-8 w-8 rounded cursor-pointer"
                  onClick={() => setShowUserMenu((prev) => !prev)}
                />
                {showUserMenu && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 w-48 bg-gray-900 rounded shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 text-white font-semibold border-b border-gray-700">
                      {user.fullName || user.username}
                    </div>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-600 font-bold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="hidden md:block bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>
            )}

            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden"
              onClick={() => {
                setIsOpen(!isOpen);
                setShowUserMenu(false);
              }}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black px-4 py-2 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className="block hover:text-red-500 w-full text-left"
                onClick={() => onNavClick(cat)}
              >
                {cat === "new-popular"
                  ? "New & Popular"
                  : cat === "my-list"
                  ? "My List"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}

            {user ? (
              <button
                className="w-full text-left px-4 py-2 mt-2 hover:bg-red-600 hover:text-white text-red-600 font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-red-600 w-full mt-3 py-1 rounded hover:bg-red-700"
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Movie Search Panel */}
      {showSearch && (
        <div className="pt-16 relative z-40">
          <MovieSearch movies={movies} onClose={closeSearch} />
        </div>
      )}

      {/* Login Popup */}
      {showLogin && (
        <LoginPopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;
