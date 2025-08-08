import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Wrap once here
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Only this is needed */}
      <App />
    </BrowserRouter>
  </StrictMode>
);


// // booking start
// import React, { useState, useEffect } from 'react';

// const Booking = ({ bookings, onUpdateBooking }) => {
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [editingBookingId, setEditingBookingId] = useState(null);
//   const [editedBookingData, setEditedBookingData] = useState({});

//   const displayFields = [
//     { key: 'name', label: 'Guest Name', type: 'text' },
//     { key: 'fatherName', label: "Father's Name", type: 'text' },
//     { key: 'age', label: 'Age', type: 'number' },
//     { key: 'mobile', label: 'Mobile No.', type: 'text' },
//     { key: 'gmail', label: 'Gmail', type: 'email' },
//     { key: 'nic', label: 'NIC', type: 'text' },
//     { key: 'members', label: 'Members', type: 'number' },
//     { key: 'checkIn', label: 'Check-In', type: 'date' },
//     { key: 'checkOut', label: 'Check-Out', type: 'date' },
//     { key: 'room', label: 'Room', type: 'text' },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (!bookings) return setFilteredBookings([]);

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const query = searchQuery.toLowerCase();

//     const results = bookings.filter((booking) => {
//       const checkOut = new Date(booking.checkOut);
//       checkOut.setHours(0, 0, 0, 0);
//       const notPast = checkOut >= today;
//       const nameMatch = booking.name?.toLowerCase().includes(query);
//       const roomMatch = (typeof booking.room === 'string'
//         ? booking.room
//         : booking.room?.roomNumber || booking.room?.type || ''
//       ).toLowerCase().includes(query);

//       return notPast && (nameMatch || roomMatch);
//     });

//     setFilteredBookings(results);
//   }, [searchQuery, bookings, currentDateTime]);

//   const formattedDate = currentDateTime.toLocaleDateString('en-US', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//   });

//   const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
//     hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
//   });

//   const handleDownloadCSV = () => {
//     if (!bookings.length) return;

//     const keys = [
//       'id', 'name', 'fatherName', 'age', 'mobile', 'gmail', 'nic',
//       'members', 'checkIn', 'checkOut', 'room'
//     ];

//     const headers = keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(',');
//     const csvRows = bookings.map(booking => {
//       return keys.map(key => {
//         let val = booking[key];
//         if (key === 'room' && typeof val === 'object') {
//           val = val.roomNumber || val.type || 'N/A';
//         }
//         return `"${(val || 'N/A').toString().replace(/"/g, '""')}"`;
//       }).join(',');
//     });

//     const blob = new Blob([headers + '\n' + csvRows.join('\n')], {
//       type: 'text/csv;charset=utf-8;'
//     });

//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'all_booking_details.csv';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleEditClick = (booking) => {
//     setEditingBookingId(booking.id);
//     setEditedBookingData({ ...booking });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBookingData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSaveClick = () => {
//     if (onUpdateBooking) {
//       onUpdateBooking(editedBookingData);
//     }
//     setEditingBookingId(null);
//     setEditedBookingData({});
//   };

//   const handleCancelClick = () => {
//     setEditingBookingId(null);
//     setEditedBookingData({});
//   };

//   return (
//   <div className="min-h-screen bg-gray-900 text-white pt-1 pb-4 sm:pt-2 sm:pb-6 lg:pt-4 lg:pb-8 flex flex-col items-start font-sans lg:w-[1030px] lg:ml-[220px] lg:mt-0">

//       <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-5xl lg:max-w-none bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-700">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-700 gap-4">
//             <div className="text-center sm:text-left">
//               <p className="text-md sm:text-lg font-medium text-gray-400">{formattedDate}</p>
//               <p className="text-xl sm:text-2xl font-bold text-white">{formattedTime}</p>
//             </div>
//             <button onClick={handleDownloadCSV} className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               Download All Bookings CSV
//             </button>
//           </div>

//           <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6">
//             All Booking Details
//           </h2>

//           <div className="mb-8 flex justify-start">
//             <input
//               type="text"
//               placeholder="Search by Guest Name or Room..."
//               className="w-full sm:w-80 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <div className="space-y-6">
//             {filteredBookings.length > 0 ? (
//               filteredBookings.map((booking) => (
//                 <div key={booking.id || `${booking.name}-${booking.checkIn}`} className="bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-600">
//                   {editingBookingId === booking.id ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {displayFields.map(field => (
//                         <div key={field.key} className="flex flex-col">
//                           <label className="text-sm font-medium text-gray-400 mb-1">{field.label}:</label>
//                           <input
//                             type={field.type}
//                             name={field.key}
//                             value={editedBookingData[field.key] || ''}
//                             onChange={handleEditChange}
//                             className="p-2 rounded bg-gray-600 border border-gray-500 text-white"
//                           />
//                         </div>
//                       ))}
//                       <div className="col-span-full flex justify-end gap-3 mt-4">
//                         <button onClick={handleSaveClick} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
//                           Save
//                         </button>
//                         <button onClick={handleCancelClick} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
//                         <h3 className="text-xl font-bold text-white">
//                           {booking.name || 'N/A'} - {typeof booking.room === 'object' ? booking.room?.roomNumber || booking.room?.type : booking.room}
//                         </h3>
//                         <button onClick={() => handleEditClick(booking)} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
//                           Edit
//                         </button>
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                         {displayFields.map(field => (
//                           <div key={field.key} className="flex flex-col">
//                             <span className="text-sm font-medium text-gray-400">{field.label}:</span>
//                             <span className="text-base text-white">
//                               {field.key === 'room'
//                                 ? (typeof booking.room === 'object'
//                                   ? booking.room?.roomNumber || booking.room?.type || 'N/A'
//                                   : booking.room || 'N/A')
//                                 : booking[field.key] || 'N/A'}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-400 text-lg">No active bookings found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;
// booking end/






// bookingmodal start
// import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';

// // BookingModal now correctly accepts an onBookingConfirmed prop
// const BookingModal = ({ room, onClose, onBookingConfirmed }) => { // <-- FIXED: Added onBookingConfirmed here
//   const [formData, setFormData] = useState({
//     name: '',
//     fatherName: '',
//     age: '',
//     mobile: '',
//     gmail: '',
//     nic: '',
//     members: '',
//     checkIn: '',
//     checkOut: '',
//   });

//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showError, setShowError] = useState(false); // New state for error message

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Generate a unique ID for the new booking
//     const newBookingWithId = {
//       id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Unique ID
//       ...formData,
//       room: room.title,
//     };

//     try {
//       // Get existing bookings, add the new one, and save back to localStorage
//       // Note: App.js will also listen to localStorage changes, but this ensures data is there.
//       const existing = JSON.parse(localStorage.getItem('bookings')) || [];
//       localStorage.setItem('bookings', JSON.stringify([...existing, newBookingWithId]));

//       // Call the prop function to notify the parent (App.js) about the new booking
//       if (onBookingConfirmed) { // This condition will now be true if the prop is passed
//         onBookingConfirmed(newBookingWithId);
//       }

//       // Send email (as per your original code)
//       await emailjs.send(
//         'gmail_service',
//         'template_378p1rd',
//         {
//           guest_name: formData.name,
//           guest_email: formData.gmail,
//           room_title: room.title,
//           father_name: formData.fatherName,
//           age: formData.age,
//           mobile: formData.mobile,
//           members: formData.members,
//           checkin_date: formData.checkIn,
//           checkout_date: formData.checkOut,
//           nic: formData.nic,
//         },
//         'J8I5pIbNWjSLM8D-f'
//       );

//       setShowSuccess(true);
//       setShowError(false); // Hide error if success

//       setTimeout(() => {
//         setShowSuccess(false);
//         onClose(); // Close modal after success
//       }, 2000);
//     } catch (err) {
//       console.error('Booking/Email error:', err);
//       setShowError(true); // Show error message
//       setShowSuccess(false); // Hide success if error
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//       <div className="bg-[#1E293B] text-white rounded-xl p-6 w-[95%] max-w-3xl relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Book Room: {room.title}</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             { name: 'name', placeholder: 'Guest Name', type: 'text' },
//             { name: 'fatherName', placeholder: 'Father Name', type: 'text' },
//             { name: 'age', placeholder: 'Age', type: 'number' },
//             { name: 'mobile', placeholder: 'Mobile Number', type: 'tel' },
//             { name: 'gmail', placeholder: 'Email Address', type: 'email' },
//             { name: 'nic', placeholder: 'NIC Number', type: 'text' },
//             { name: 'members', placeholder: 'No. of Members', type: 'number' },
//           ].map((field) => (
//             <input
//               key={field.name}
//               type={field.type}
//               name={field.name}
//               placeholder={field.placeholder}
//               value={formData[field.name]}
//               onChange={handleChange}
//               required
//               className="p-2 rounded bg-gray-800 border border-gray-600 placeholder-gray-400"
//             />
//           ))}

//           <div className="flex flex-col">
//             <label htmlFor="checkIn" className="mb-1 text-sm text-gray-300">Check-in Date</label>
//             <input
//               type="date"
//               id="checkIn"
//               name="checkIn"
//               value={formData.checkIn}
//               onChange={handleChange}
//               required
//               className="p-2 rounded bg-gray-800 border border-gray-600"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="checkOut" className="mb-1 text-sm text-gray-300">Check-out Date</label>
//             <input
//               type="date"
//               id="checkOut"
//               name="checkOut"
//               value={formData.checkOut}
//               onChange={handleChange}
//               required
//               className="p-2 rounded bg-gray-800 border border-gray-600"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-bold"
//             >
//               Confirm Booking
//             </button>
//           </div>
//         </form>

//         {showSuccess && (
//           <div className="mt-4 bg-green-700 text-white px-4 py-2 rounded shadow text-center">
//             ✅ Booking confirmed! Email sent.
//           </div>
//         )}
//         {showError && (
//           <div className="mt-4 bg-red-700 text-white px-4 py-2 rounded shadow text-center">
//             ❌ Could not confirm booking. Please try again.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

// booking modal end



// room.jsx start
// import React, { useState, useEffect } from 'react';
// import roomData from './RoomData';
// import BookingModal from './BookingModal';
// import { FaBed } from 'react-icons/fa';

// const Rooms = () => {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [viewingRoom, setViewingRoom] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState({
//     type: '',
//     status: '',
//     minPrice: '',
//     maxPrice: '',
//   });

//   useEffect(() => {
//     const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
//     setBookings(storedBookings);
//   }, []);

//   const handleBook = (bookingDetails) => {
//     const newBooking = { ...bookingDetails, room: selectedRoom };
//     const updatedBookings = [...bookings, newBooking];

//     setBookings(updatedBookings);
//     localStorage.setItem('bookings', JSON.stringify(updatedBookings));
//     setSelectedRoom(null);
//   };

//   const filteredRooms = roomData.filter((room) => {
//     const matchesSearch =
//       room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       room.id.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesType = filter.type ? room.type === filter.type : true;
//     const matchesStatus = filter.status ? room.status === filter.status : true;
//     const matchesMin = filter.minPrice ? room.price >= Number(filter.minPrice) : true;
//     const matchesMax = filter.maxPrice ? room.price <= Number(filter.maxPrice) : true;

//     return matchesSearch && matchesType && matchesStatus && matchesMin && matchesMax;
//   });

//   return (
//     <div className="flex flex-col w-full p-4 space-y-6 ml-0 md:ml-[240px] overflow-x-hidden -mt-6">
//       {/* Header */}
//       <div className="mt-4 md:mt-6 flex items-center gap-2 text-white text-2xl md:text-3xl font-bold justify-center md:justify-start">
//         <FaBed className="text-blue-400" />
//         <h2>Our Rooms</h2>
//       </div>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search by Room ID or Title"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="p-3 rounded-md bg-[#1E293B] text-white border border-gray-600 focus:outline-none w-full max-w-xl"
//       />

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap bg-white dark:bg-[#1E293B] rounded-lg shadow p-4 w-full md:w-[800px]">
//         <select
//           value={filter.type}
//           onChange={(e) => setFilter({ ...filter, type: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
//         >
//           <option value="">All Types</option>
//           <option value="Single">Single</option>
//           <option value="Double">Double</option>
//           <option value="Suite">Suite</option>
//         </select>

//         <select
//           value={filter.status}
//           onChange={(e) => setFilter({ ...filter, status: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
//         >
//           <option value="">All Status</option>
//           <option value="Available">Available</option>
//           <option value="Booked">Booked</option>
//           <option value="Maintenance">Maintenance</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Min Price"
//           value={filter.minPrice}
//           onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
//         />

//         <input
//           type="number"
//           placeholder="Max Price"
//           value={filter.maxPrice}
//           onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
//         />

//         <button
//           onClick={() => setFilter({ type: '', status: '', minPrice: '', maxPrice: '' })}
//           className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Room Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:w-[950px]">
//         {filteredRooms.map((room) => (
//           <div
//             key={room.id}
//             className="bg-[#1E293B] rounded-lg border border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
//           >
//             <img
//               src={room.images[0]}
//               alt={room.title}
//               className="w-full h-32 sm:h-36 object-cover"
//             />
//             <div className="p-3 space-y-1">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-semibold text-white truncate">{room.title}</h3>
//                 <span
//                   className={`text-[10px] font-semibold ${
//                     room.status === 'Available'
//                       ? 'text-green-400'
//                       : room.status === 'Booked'
//                       ? 'text-red-500'
//                       : 'text-yellow-400'
//                   }`}
//                 >
//                   {room.status}
//                 </span>
//               </div>

//               <p className="text-[11px] text-gray-400 line-clamp-2">{room.description}</p>

//               <div className="text-[10px] text-gray-400 space-y-[2px]">
//                 <p>Room ID: <span className="text-white">{room.id}</span></p>
//                 <p>Type: <span className="text-white">{room.type}</span></p>
//                 <p>Price: <span className="text-white">${room.price}/night</span></p>
//               </div>

//               <div className="flex space-x-1 pt-2">
//                 {room.status === 'Available' ? (
//                   <button
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white text-[11px] px-2 py-[6px] rounded transition"
//                     onClick={() => setSelectedRoom(room)}
//                   >
//                     Book
//                   </button>
//                 ) : (
//                   <button
//                     className="flex-1 bg-gray-700 text-white text-[11px] px-2 py-[6px] rounded cursor-not-allowed"
//                     disabled
//                   >
//                     {room.status === 'Booked' ? 'Booked' : 'Unavailable'}
//                   </button>
//                 )}
//                 <button
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-2 py-[6px] rounded transition"
//                   onClick={() => setViewingRoom(room)}
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Booking Modal */}
//       {selectedRoom && (
//         <BookingModal
//           room={selectedRoom}
//           onClose={() => setSelectedRoom(null)}
//           onBookingConfirmed={handleBook} // ✅ correct prop name
//         />
//       )}

//       {/* View Details Modal */}
//       {viewingRoom && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-[#1E293B] border border-gray-700 p-6 rounded-lg max-w-3xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-white">
//                 Room Details: {viewingRoom.title}
//               </h2>
//               <button
//                 className="text-red-400 hover:text-red-600 font-bold text-xl"
//                 onClick={() => setViewingRoom(null)}
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <img
//                 src={viewingRoom.images[0]}
//                 alt={viewingRoom.title}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//               <div className="text-gray-300 text-sm space-y-2">
//                 <p><strong>ID:</strong> {viewingRoom.id}</p>
//                 <p><strong>Type:</strong> {viewingRoom.type}</p>
//                 <p><strong>Price:</strong> ${viewingRoom.price}/night</p>
//                 <p><strong>Status:</strong> {viewingRoom.status}</p>
//                 <p><strong>Description:</strong> {viewingRoom.description}</p>
//                 <p><strong>Amenities:</strong> {viewingRoom.amenities?.join(', ') || 'N/A'}</p>
//                 <p><strong>Guests:</strong> Max {viewingRoom.maxGuests}</p>
//                 <p><strong>Size:</strong> {viewingRoom.size} sq ft</p>
//                 <p><strong>Beds:</strong> {viewingRoom.beds}</p>
//               </div>
//             </div>
//             <div className="text-right mt-4">
//               <button
//                 onClick={() => setViewingRoom(null)}
//                 className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bookings List */}
//         </div>
//   );
// };

// export default Rooms;


// // room.jsx end

// // src/components/Rooms.jsx
// import React, { useState } from 'react';
// import { FaBed, FaCheckCircle } from 'react-icons/fa';
// import roomData from './RoomData'; // Assuming RoomData.js contains all 20 rooms
// import BookingModal from './BookingModal';

// const Rooms = ({ bookings, onBookingConfirmed }) => {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [viewingRoom, setViewingRoom] = useState(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState({
//     type: '',
//     status: '',
//     minPrice: '',
//     maxPrice: '',
//   });

//   const handleBook = (bookingDetails) => {
//     const newBooking = { ...bookingDetails, room: selectedRoom };
//     onBookingConfirmed(newBooking);
//     setSelectedRoom(null);
//     setShowSuccessPopup(true);
//     setTimeout(() => setShowSuccessPopup(false), 3000);
//   };

//   // Function to check if a room is currently booked
//   const isRoomBooked = (roomId) => bookings.some((b) => b.room?.id === roomId);

//   const filteredRooms = roomData.filter((room) => {
//     const matchesSearch =
//       room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       room.id.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesType = filter.type ? room.type === filter.type : true;
//     const matchesMin = filter.minPrice ? room.price >= Number(filter.minPrice) : true;
//     const matchesMax = filter.maxPrice ? room.price <= Number(filter.maxPrice) : true;

//     // Determine the room's current status based on bookings
//     const roomIsBooked = isRoomBooked(room.id);
//     const roomIsMaintenance = room.status === 'Maintenance';
//     const roomIsAvailable = !roomIsBooked && !roomIsMaintenance;

//     const matchesStatus = filter.status
//       ? (filter.status === 'Booked' && roomIsBooked) ||
//         (filter.status === 'Maintenance' && roomIsMaintenance) ||
//         (filter.status === 'Available' && roomIsAvailable)
//       : true;

//     return matchesSearch && matchesType && matchesStatus && matchesMin && matchesMax;
//   });

//   return (
//     <div className="flex flex-col w-full p-4 space-y-6 ml-0 md:ml-[240px] overflow-x-hidden -mt-6">
//       {showSuccessPopup && (
//         <div
//           className={`fixed left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm transition-all duration-500 ease-out 
//             ${showSuccessPopup ? 'top-4' : 'top-[-100px]'}`}
//         >
//           <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 border border-green-500">
//             <FaCheckCircle className="text-white text-2xl" />
//             <span className="text-base font-semibold">Booking Confirmed!</span>
//           </div>
//         </div>
//       )}

//       <div className="mt-4 md:mt-6 flex items-center gap-2 text-white text-2xl md:text-3xl font-bold justify-center md:justify-start">
//         <FaBed className="text-blue-400" />
//         <h2>Our Rooms</h2>
//       </div>

//       <input
//         type="text"
//         placeholder="Search by Room ID or Title"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="p-3 rounded-md bg-[#1E293B] text-white border border-gray-600 focus:outline-none w-full max-w-xl"
//       />

//       <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap bg-white dark:bg-[#1E293B] rounded-lg shadow p-4 w-full md:w-[800px]">
//         <select
//           value={filter.type}
//           onChange={(e) => setFilter({ ...filter, type: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto cursor-pointer"
//         >
//           <option value="">All Types</option>
//           <option value="Single">Single</option>
//           <option value="Double">Double</option>
//           <option value="Suite">Suite</option>
//         </select>

//         <select
//           value={filter.status}
//           onChange={(e) => setFilter({ ...filter, status: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto cursor-pointer"
//         >
//           <option value="">All Status</option>
//           <option value="Available">Available</option>
//           <option value="Booked">Booked</option>
//           <option value="Maintenance">Maintenance</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Min Price"
//           value={filter.minPrice}
//           onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
//         />
//         <input
//           type="number"
//           placeholder="Max Price"
//           value={filter.maxPrice}
//           onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
//           className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
//         />

//         <button
//           onClick={() => setFilter({ type: '', status: '', minPrice: '', maxPrice: '' })}
//           className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition cursor-pointer"
//         >
//           Reset Filters
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:w-[950px]">
//         {filteredRooms.map((room) => {
//           const isBooked = isRoomBooked(room.id);
//           const isMaintained = room.status === 'Maintenance';
//           const canBook = !isMaintained && !isBooked;

//           return (
//             <div
//               key={room.id}
//               className="bg-[#1E293B] rounded-lg border border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
//             >
//               <img
//                 src={room.images[0]}
//                 alt={room.title}
//                 className="w-full h-32 sm:h-36 object-cover"
//               />
//               <div className="p-3 space-y-1">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-sm font-semibold text-white truncate">{room.title}</h3>
//                   <span
//                     className={`text-[10px] font-semibold ${
//                       isBooked
//                         ? 'text-red-500'
//                         : isMaintained
//                           ? 'text-yellow-400'
//                           : 'text-green-400'
//                     }`}
//                   >
//                     {isBooked ? 'Booked' : isMaintained ? 'Maintenance' : 'Available'}
//                   </span>
//                 </div>
//                 <p className="text-[11px] text-gray-400 line-clamp-2">{room.description}</p>
//                 <div className="text-[10px] text-gray-400 space-y-[2px]">
//                   <p>
//                     Room ID: <span className="text-white">{room.id}</span>
//                   </p>
//                   <p>
//                     Type: <span className="text-white">{room.type}</span>
//                   </p>
//                   <p>
//                     Price: <span className="text-white">${room.price}/night</span>
//                   </p>
//                 </div>
//                 <div className="flex space-x-1 pt-2">
//                   <button
//                     className={`flex-1 text-white text-[11px] px-2 py-[6px] rounded transition ${
//                       canBook
//                         ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
//                         : isMaintained
//                           ? 'bg-yellow-600 hover:bg-yellow-700 cursor-not-allowed'
//                           : 'bg-gray-700 cursor-not-allowed'
//                     }`}
//                     onClick={() => canBook && setSelectedRoom(room)}
//                     disabled={!canBook}
//                   >
//                     {isBooked ? 'Booked' : isMaintained ? 'Maintenance' : 'Book'}
//                   </button>
//                   <button
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-2 py-[6px] rounded transition cursor-pointer"
//                     onClick={() => setViewingRoom(room)}
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {selectedRoom && (
//         <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onBookingConfirmed={handleBook} />
//       )}

//       {viewingRoom && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-[#1E293B] border border-gray-700 p-6 rounded-lg max-w-3xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-white">Room Details: {viewingRoom.title}</h2>
//               <button className="text-red-400 hover:text-red-600 font-bold text-xl cursor-pointer" onClick={() => setViewingRoom(null)}>
//                 &times;
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <img
//                 src={viewingRoom.images[0]}
//                 alt={viewingRoom.title}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//               <div className="text-gray-300 text-sm space-y-2">
//                 <p>
//                   <strong>ID:</strong> {viewingRoom.id}
//                 </p>
//                 <p>
//                   <strong>Type:</strong> {viewingRoom.type}
//                 </p>
//                 <p>
//                   <strong>Price:</strong> ${viewingRoom.price}/night
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {isRoomBooked(viewingRoom.id) ? 'Booked' : viewingRoom.status}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {viewingRoom.description}
//                 </p>
//                 <p>
//                   <strong>Amenities:</strong> {viewingRoom.amenities?.join(', ') || 'N/A'}
//                 </p>
//                 <p>
//                   <strong>Guests:</strong> Max {viewingRoom.maxGuests}
//                 </p>
//                 <p>
//                   <strong>Size:</strong> {viewingRoom.size} sq ft
//                 </p>
//                 <p>
//                   <strong>Beds:</strong> {viewingRoom.beds}
//                 </p>
//               </div>
//             </div>
//             <div className="text-right mt-4">
//               <button onClick={() => setViewingRoom(null)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Rooms;