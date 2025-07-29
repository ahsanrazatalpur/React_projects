import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDark(savedTheme === 'dark');
    document.body.classList.toggle('dark', savedTheme === 'dark');
    document.body.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.body.classList.toggle('dark', !isDark);
    document.body.classList.toggle('light', isDark);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <label className="theme-switch">
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className="slider">
        <span className="knob">
          {isDark ? <FaMoon className="icon" /> : <FaSun className="icon" />}
        </span>
      </span>
    </label>
  );
};

export default ThemeToggle;
