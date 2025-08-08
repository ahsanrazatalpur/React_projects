import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBed,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ImHome } from "react-icons/im";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Reactively track admin login status
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("adminLoggedIn") === "true");

  useEffect(() => {
    // Update admin state on custom event (dispatched on login/logout)
    const handleLoginChange = () => {
      setIsAdmin(localStorage.getItem("adminLoggedIn") === "true");
    };

    window.addEventListener("loginStatusChanged", handleLoginChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
  }, []);

  // Links visible to all users
  const commonNavItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/" },
    { icon: <FaBed />, label: "Rooms", path: "/rooms" },
    { icon: <FaChartBar />, label: "Reports", path: "/reports" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  // Admin-only links (will be inserted inline after Rooms)
  const adminNavItems = [
    { icon: <FaClipboardList />, label: "Bookings", path: "/bookings" },
    { icon: <FaUsers />, label: "Room Status", path: "/roomstatus" },
  ];

  // Build nav items array based on login status
  let navItems = [...commonNavItems];
  if (isAdmin) {
    const roomsIndex = navItems.findIndex(item => item.label === "Rooms");
    if (roomsIndex !== -1) {
      navItems.splice(roomsIndex + 1, 0, ...adminNavItems);
    } else {
      navItems = [...navItems, ...adminNavItems];
    }
  }

  return (
    <>
      {/* Toggle Button - Mobile Only */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#1E293B] p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1E293B] text-white flex flex-col p-6 z-40 border-r border-slate-700 rounded-r-2xl shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <ImHome className="text-yellow-400 text-3xl" />
          <span className="text-2xl font-bold tracking-wide">GlowStay</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ icon, label, path }) => (
            <Link key={label} to={path} onClick={() => setIsOpen(false)}>
              <NavItem icon={icon} label={label} active={location.pathname === path} />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

const NavItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer group transition duration-200 ${
      active ? "bg-slate-800" : "hover:bg-slate-800"
    }`}
  >
    <span className="text-xl text-blue-400 group-hover:text-blue-300">{icon}</span>
    <span className="text-sm font-medium group-hover:text-white">{label}</span>
  </div>
);

export default Sidebar;
