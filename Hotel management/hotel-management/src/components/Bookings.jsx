import React, { useState, useEffect } from 'react';
import { FaBed } from 'react-icons/fa';
import { useNotification } from '../components/NotificationContext';

const Booking = ({ bookings, onUpdateBooking, onRemoveGuest }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedBookingData, setEditedBookingData] = useState({});
  const { addNotification } = useNotification();

  const displayFields = [
    { key: 'name', label: 'Guest Name', type: 'text' },
    { key: 'fatherName', label: "Father's Name", type: 'text' },
    { key: 'age', label: 'Age', type: 'number' },
    { key: 'mobile', label: 'Mobile No.', type: 'text' },
    { key: 'gmail', label: 'Gmail', type: 'email' },
    { key: 'nic', label: 'NIC', type: 'text' },
    { key: 'members', label: 'Members', type: 'number' },
    { key: 'checkIn', label: 'Check-In', type: 'date' },
    { key: 'checkOut', label: 'Check-Out', type: 'date' },
    { key: 'room', label: 'Room', type: 'text' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!bookings) return setFilteredBookings([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const query = searchQuery.toLowerCase();

    const results = bookings.filter((booking) => {
      const checkOutDate = new Date(booking.checkOut);
      checkOutDate.setHours(0, 0, 0, 0);

      const notPast = checkOutDate >= today;
      const nameMatch = booking.name?.toLowerCase().includes(query);

      const roomValue = typeof booking.room === 'string'
        ? booking.room
        : booking.room?.id || booking.room?.type || '';

      const roomMatch = roomValue.toLowerCase().includes(query);

      return notPast && (nameMatch || roomMatch);
    });

    setFilteredBookings(results);
  }, [searchQuery, bookings, currentDateTime]);

  const formatTimestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  const handleEditClick = (booking) => {
    setEditingBookingId(booking.id);
    setEditedBookingData({ ...booking });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    onUpdateBooking(editedBookingData);
    setEditingBookingId(null);
    setEditedBookingData({});

    const roomLabel = typeof editedBookingData.room === 'object'
      ? editedBookingData.room?.id || editedBookingData.room?.type
      : editedBookingData.room;

    addNotification({
      message: `Booking updated for ${editedBookingData.name} in Room ${roomLabel}`,
      timestamp: formatTimestamp(),
      type: 'update'
    });
  };

  const handleCancelClick = () => {
    setEditingBookingId(null);
    setEditedBookingData({});
  };

  const handleRemoveBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to remove this guest?")) {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        const roomLabel = typeof booking.room === 'object'
          ? booking.room?.id || booking.room?.type
          : booking.room;

        addNotification({
          message: `Guest ${booking.name} has been removed from Room ${roomLabel}`,
          timestamp: formatTimestamp(),
          type: 'remove'
        });

        addNotification({
          message: `Room ${roomLabel} status changed to "Vacant"`,
          timestamp: formatTimestamp(),
          type: 'status'
        });
      }
      if (onRemoveGuest) {
        onRemoveGuest(bookingId);
      }
    }
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  const handleDownloadCSV = () => {
    if (!bookings || !bookings.length) return;

    const keys = [
      'id', 'name', 'fatherName', 'age', 'mobile', 'gmail', 'nic',
      'members', 'checkIn', 'checkOut', 'room'
    ];

    const headers = keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(',');
    const csvRows = bookings.map(booking => {
      return keys.map(key => {
        let val = booking[key];
        if (key === 'room' && typeof val === 'object') {
          val = val.id || val.type || 'N/A';
        }
        return `"${(val || 'N/A').toString().replace(/"/g, '""')}"`;
      }).join(',');
    });

    const blob = new Blob([headers + '\n' + csvRows.join('\n')], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_booking_details.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-1 pb-4 sm:pt-2 sm:pb-6 flex flex-col items-start font-sans md:w-full lg:w-[1030px] md:ml-[220px] lg:-mt-0 mt-10">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-700">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-8 pb-4 border-b border-gray-700 gap-4">
            <div className="text-center sm:text-left">
              <p className="text-md sm:text-lg font-medium text-gray-400">{formattedDate}</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{formattedTime}</p>
            </div>
            <button
              onClick={handleDownloadCSV}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Download All Bookings CSV
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6">All Booking Details</h2>
          <div className="mb-8 flex justify-start">
            <input
              type="text"
              placeholder="Search by Guest Name or Room..."
              className="w-full sm:w-80 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-6">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id || `${booking.name}-${booking.checkIn}`} className="bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-600">
                  {editingBookingId === booking.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayFields.map(field => (
                        <div key={field.key} className="flex flex-col">
                          <label className="text-sm font-medium text-gray-400 mb-1">{field.label}:</label>
                          <input
                            type={field.type}
                            name={field.key}
                            value={editedBookingData[field.key] || ''}
                            onChange={handleEditChange}
                            className="p-2 rounded bg-gray-600 border border-gray-500 text-white"
                          />
                        </div>
                      ))}
                      <div className="col-span-full flex flex-wrap justify-end gap-3 mt-4">
                        <button onClick={handleSaveClick} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Save</button>
                        <button onClick={handleCancelClick} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center mb-4 gap-2">
                        <h3 className="text-xl font-bold text-white">
                          {booking.name || 'N/A'} - {typeof booking.room === 'object' ? booking.room?.id || booking.room?.type : booking.room}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleEditClick(booking)} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">Edit</button>
                          <button onClick={() => handleRemoveBooking(booking.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Remove Guest</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {displayFields.map(field => (
                          <div key={field.key} className="flex flex-col">
                            <span className="text-sm font-medium text-gray-400">{field.label}:</span>
                            <span className="text-base text-white">
                              {field.key === 'room'
                                ? (typeof booking.room === 'object'
                                  ? booking.room?.id || booking.room?.type || 'N/A'
                                  : booking.room || 'N/A')
                                : booking[field.key] || 'N/A'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-lg">No active bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
