// src/components/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import {
  FaUserCircle, FaBed, FaUserFriends, FaClipboardList, FaUserShield
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import NotificationBell from "./NotificationBell";
import { useNotification } from "./NotificationContext";
import roomData from './RoomData';

const data = [
  { month: "Jan", bookings: 10 },
  { month: "Feb", bookings: 20 },
  { month: "Mar", bookings: 15 },
  { month: "Apr", bookings: 30 },
  { month: "May", bookings: 25 },
  { month: "Jun", bookings: 40 },
];

const Dashboard = ({ allBookingsFromParent, housekeepingStatuses = {} }) => {
  const [bookings, setBookings] = useState(
    allBookingsFromParent || JSON.parse(localStorage.getItem('bookings')) || []
  );
  const { addNotification } = useNotification();
  const previousBookingsRef = useRef([]);
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("adminLoggedIn") === "true");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (allBookingsFromParent) {
      setBookings(allBookingsFromParent);
    }
  }, [allBookingsFromParent]);

  useEffect(() => {
    const prevBookings = previousBookingsRef.current;
    const currentGuestMap = new Map(bookings.map(b => [b.room?.id, b]));
    const prevGuestMap = new Map(prevBookings.map(b => [b.room?.id, b]));

    bookings.forEach((booking) => {
      const roomId = booking.room?.id;
      if (!prevGuestMap.has(roomId)) {
        addNotification(`Room #${roomId} has been booked by ${booking.name || 'Unknown Guest'}`);
      }
    });

    prevBookings.forEach((booking) => {
      const roomId = booking.room?.id;
      if (!currentGuestMap.has(roomId)) {
        addNotification(`Guest ${booking.name || 'Unknown Guest'} has been removed`);
      }
    });

    previousBookingsRef.current = bookings;
  }, [bookings, addNotification]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeBookingsCount = bookings.filter(b => {
    const checkOut = new Date(b.checkOut);
    checkOut.setHours(0, 0, 0, 0);
    return checkOut >= today;
  }).length;

  const getRoomCombinedStatus = (room) => {
    const isUnderMaintenance = room.status === 'Maintenance';
    if (isUnderMaintenance) {
      return {
        displayStatus: 'Maintenance',
        color: 'bg-yellow-500',
        bookingInfo: null,
      };
    }

    const currentBooking = bookings.find(b => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(0, 0, 0, 0);
      return b.room?.id === room.id && checkIn <= today && checkOut >= today;
    });

    if (currentBooking) {
      return {
        displayStatus: 'Occupied',
        color: 'bg-red-500',
        bookingInfo: currentBooking,
      };
    }

    const futureBooking = bookings.find(b => {
      const checkIn = new Date(b.checkIn);
      checkIn.setHours(0, 0, 0, 0);
      return b.room?.id === room.id && checkIn > today;
    });

    if (futureBooking) {
      return {
        displayStatus: 'Booked',
        color: 'bg-red-500',
        bookingInfo: futureBooking,
      };
    }

    return {
      displayStatus: 'Available',
      color: 'bg-green-500',
      bookingInfo: null,
    };
  };

  const handleLogin = () => {
    if (username === "ahsanraza" && password === "30052003") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdmin(false);
  };

  return (
    <div className="bg-white dark:bg-[#0F172A] min-h-screen text-black dark:text-white transition-all duration-300 flex-1 w-full lg:w-[1130px] md:ml-[168px] overflow-y-auto lg:overflow-hidden">
      <main className="pt-3 w-full">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5 relative">
            <h1 className="text-lg md:text-xl font-semibold text-center md:text-left w-full md:w-auto">
              Dashboard
            </h1>
            <div className="flex items-center justify-end gap-4 absolute top-0 right-0 p-4 z-50">
              <NotificationBell />
              {isAdmin ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white text-sm hover:text-blue-400 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <FaUserCircle
                  className="text-current text-lg hover:text-blue-400 cursor-pointer"
                  onClick={() => setShowLogin(true)}
                />
              )}
            </div>
          </div>

          {/* Login Popup */}
          {showLogin && !isAdmin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm relative text-white">
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-3 right-4 text-white text-2xl hover:text-red-400"
                >
                  ✖
                </button>
                <div className="flex justify-center mb-6 text-green-500 text-6xl">
                  <FaUserShield />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <input
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <Link to="/rooms" className="w-full">
              <div className="bg-gray-100 dark:bg-[#1E293B] py-6 px-3 rounded-xl flex items-center gap-3 shadow w-full hover:shadow-lg transition">
                <FaBed className="text-blue-400 text-xl" />
                <span className="text-sm font-medium">{roomData.length} Total Rooms</span>
              </div>
            </Link>

            {isAdmin && (
              <Link to="/bookings" className="w-full">
                <div className="bg-gray-100 dark:bg-[#1E293B] py-6 px-3 rounded-xl flex items-center gap-3 shadow w-full hover:shadow-lg transition">
                  <FaClipboardList className="text-blue-400 text-xl" />
                  <span className="text-sm font-medium">{activeBookingsCount} Active Bookings</span>
                </div>
              </Link>
            )}

            <div className="bg-gray-100 dark:bg-[#1E293B] py-6 px-3 rounded-xl flex items-center gap-3 shadow w-full">
              <FaUserFriends className="text-blue-400 text-xl" />
              <span className="text-sm font-medium">120 Recent Users</span>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-100 dark:bg-[#1E293B] p-4 rounded-xl mb-5 shadow w-full">
            <h2 className="text-base font-medium mb-4 text-center w-full">Booking Trend</h2>
            <div className="overflow-x-auto">
              <div className="w-full h-[300px] lg:h-60 min-w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="month" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Room Table */}
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-black dark:text-white">Room Overview</h2>
          <div className="bg-gray-100 dark:bg-[#1E293B] p-4 rounded-xl shadow w-full overflow-x-auto lg:overflow-hidden">
            <table className="min-w-[700px] md:min-w-full text-sm table-auto">
              <thead>
                <tr className="text-blue-600 dark:text-blue-300 border-b border-gray-300 dark:border-slate-700 text-left">
                  <th className="py-3 px-3">Room ID</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Guests</th>
                  <th className="py-3 px-3">Cleanliness</th>
                </tr>
              </thead>
              <tbody>
                {roomData.map((room) => {
                  const roomStatusInfo = getRoomCombinedStatus(room);
                  const cleanlinessStatus = housekeepingStatuses[room.id]?.cleanlinessStatus || 'N/A';
                  return (
                    <tr
                      key={room.id}
                      className="border-b border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800"
                    >
                      <td className="py-3 px-3 text-white">{room.id}</td>
                      <td className="py-3 px-3 text-gray-300">{room.type}</td>
                      <td className="py-3 px-3 text-gray-300">${room.price}/night</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${roomStatusInfo.color}`}>
                          {roomStatusInfo.displayStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-300">
                        {roomStatusInfo.bookingInfo?.name || 'N/A'}
                      </td>
                      <td className="py-3 px-3 text-gray-300">
                        {room.status === 'Maintenance' ? 'Maintenance' : cleanlinessStatus}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
