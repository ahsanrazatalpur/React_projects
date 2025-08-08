// src/components/NotificationContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Helper: Format timestamp consistently
  const formatTimestamp = (date = new Date()) => {
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Adds a notification with a unique message and timestamp
  const addNotification = (message, type = 'info') => {
    const timestamp = formatTimestamp();
    const newNotification = {
      id: Date.now() + Math.random(), // ensure uniqueness
      message,
      type,
      timestamp,
      read: false,
    };

    setNotifications((prev) => {
      const isDuplicate = prev.some(
        (n) => n.message === newNotification.message && n.timestamp === newNotification.timestamp
      );
      return isDuplicate ? prev : [newNotification, ...prev];
    });
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Clear all
  const removeAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllAsRead, removeAllNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
