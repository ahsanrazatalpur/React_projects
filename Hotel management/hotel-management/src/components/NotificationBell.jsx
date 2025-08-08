// src/components/NotificationBell.jsx
import React, { useState } from 'react';
import { useNotification } from './NotificationContext';
import { FaBell, FaCheckDouble, FaTrash } from 'react-icons/fa';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const {
    notifications,
    markAllAsRead,
    removeAllNotifications,
  } = useNotification();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications((prev) => !prev)}
        className="relative"
      >
        <FaBell className="text-white text-2xl" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg z-50 rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-2 bg-gray-100">
            <span className="font-bold">Notifications</span>
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="text-blue-500 text-sm flex items-center gap-1"
              >
                <FaCheckDouble /> Mark all as read
              </button>
              <button
                onClick={removeAllNotifications}
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <FaTrash /> Clear all
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500">No notifications</div>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`px-4 py-2 border-b hover:bg-gray-50 ${
                    n.read ? 'text-gray-500' : 'text-black font-medium'
                  }`}
                >
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-400">{n.timestamp}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
