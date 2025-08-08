// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Rooms from './components/Rooms';
import Bookings from './components/Bookings';
import RoomStatus from './components/RoomStatus';
import Reports from './components/Reports';
import Settings from './components/Settings';

import { NotificationProvider, useNotification } from './components/NotificationContext';

const AppContent = () => {
  const [bookings, setBookings] = useState([]);
  const [housekeepingStatuses, setHousekeepingStatuses] = useState(() => {
    // Initialize from localStorage or empty object
    const saved = localStorage.getItem('housekeepingStatuses');
    return saved ? JSON.parse(saved) : {};
  });
  const { addNotification } = useNotification();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(stored);
  }, []);

  // Sync housekeepingStatuses to localStorage on change
  useEffect(() => {
    localStorage.setItem('housekeepingStatuses', JSON.stringify(housekeepingStatuses));
  }, [housekeepingStatuses]);

  const handleBookingConfirmed = (newBooking) => {
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));

    const guestName = newBooking.name?.trim() || 'Unknown Guest';
    console.log('Booking confirmed:', newBooking);

    addNotification(`Room #${newBooking.roomNumber} has been booked by ${guestName}`);
  };

  const handleUpdateBooking = (updatedBooking) => {
    const updatedList = bookings.map((b) =>
      b.id === updatedBooking.id ? updatedBooking : b
    );
    setBookings(updatedList);
    localStorage.setItem('bookings', JSON.stringify(updatedList));
    addNotification(`Booking updated for room #${updatedBooking.roomNumber}`);
  };

  const handleRemoveGuest = (bookingId) => {
    const removedBooking = bookings.find((b) => b.id === bookingId);
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    if (removedBooking) {
      addNotification(`Guest removed from room #${removedBooking.roomNumber}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto relative">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                allBookingsFromParent={bookings}
                housekeepingStatuses={housekeepingStatuses}
              />
            }
          />
          <Route
            path="/rooms"
            element={<Rooms bookings={bookings} onBookingConfirmed={handleBookingConfirmed} />}
          />
          <Route
            path="/bookings"
            element={
              <Bookings
                bookings={bookings}
                onUpdateBooking={handleUpdateBooking}
                onRemoveGuest={handleRemoveGuest}
              />
            }
          />
          <Route
            path="/roomstatus"
            element={
              <RoomStatus
                bookings={bookings}
                housekeepingStatuses={housekeepingStatuses}
                setHousekeepingStatuses={setHousekeepingStatuses}
                onRemoveGuest={handleRemoveGuest}
              />
            }
          />
          <Route path="/reports" element={<Reports bookings={bookings} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <NotificationProvider>
    <AppContent />
  </NotificationProvider>
);

export default App;
