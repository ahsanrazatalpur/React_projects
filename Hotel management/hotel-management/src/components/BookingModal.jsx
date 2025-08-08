import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// BookingModal now correctly accepts an onBookingConfirmed prop
const BookingModal = ({ room, onClose, onBookingConfirmed }) => { // <-- FIXED: Added onBookingConfirmed here
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    age: '',
    mobile: '',
    gmail: '',
    nic: '',
    members: '',
    checkIn: '',
    checkOut: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false); // New state for error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique ID for the new booking
    const newBookingWithId = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      ...formData,
      room: room.title,
    };

    try {
      // Get existing bookings, add the new one, and save back to localStorage
      // Note: App.js will also listen to localStorage changes, but this ensures data is there.
      const existing = JSON.parse(localStorage.getItem('bookings')) || [];
      localStorage.setItem('bookings', JSON.stringify([...existing, newBookingWithId]));

      // Call the prop function to notify the parent (App.js) about the new booking
      if (onBookingConfirmed) { // This condition will now be true if the prop is passed
        onBookingConfirmed(newBookingWithId);
      }

      // Send email (as per your original code)
      await emailjs.send(
        'gmail_service',
        'template_378p1rd',
        {
          guest_name: formData.name,
          guest_email: formData.gmail,
          room_title: room.title,
          father_name: formData.fatherName,
          age: formData.age,
          mobile: formData.mobile,
          members: formData.members,
          checkin_date: formData.checkIn,
          checkout_date: formData.checkOut,
          nic: formData.nic,
        },
        'J8I5pIbNWjSLM8D-f'
      );

      setShowSuccess(true);
      setShowError(false); // Hide error if success

      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Close modal after success
      }, 2000);
    } catch (err) {
      console.error('Booking/Email error:', err);
      setShowError(true); // Show error message
      setShowSuccess(false); // Hide success if error
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#1E293B] text-white rounded-xl p-6 w-[95%] max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Book Room: {room.title}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'name', placeholder: 'Guest Name', type: 'text' },
            { name: 'fatherName', placeholder: 'Father Name', type: 'text' },
            { name: 'age', placeholder: 'Age', type: 'number' },
            { name: 'mobile', placeholder: 'Mobile Number', type: 'tel' },
            { name: 'gmail', placeholder: 'Email Address', type: 'email' },
            { name: 'nic', placeholder: 'NIC Number', type: 'text' },
            { name: 'members', placeholder: 'No. of Members', type: 'number' },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400"
            />
          ))}

          <div className="flex flex-col">
            <label htmlFor="checkIn" className="mb-1 text-sm text-gray-300">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="p-2 rounded bg-gray-800 border border-gray-600"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="checkOut" className="mb-1 text-sm text-gray-300">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="p-2 rounded bg-gray-800 border border-gray-600"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-bold"
            >
              Confirm Booking
            </button>
          </div>
        </form>

        {showSuccess && (
          <div className="mt-4 bg-green-700 text-white px-4 py-2 rounded shadow text-center">
            ✅ Booking confirmed! Email sent.
          </div>
        )}
        {showError && (
          <div className="mt-4 bg-red-700 text-white px-4 py-2 rounded shadow text-center">
            ❌ Could not confirm booking. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
