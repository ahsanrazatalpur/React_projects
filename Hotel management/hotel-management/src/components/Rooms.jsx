import { useEffect, useState } from 'react';
import roomData from './RoomData';
import BookingModal from './BookingModal';
import { useNotification } from './NotificationContext';
import {
  FaBed,
  FaCheckCircle,
} from 'react-icons/fa';

const Rooms = ({ bookings, onBookingConfirmed }) => {
  const [rooms, setRooms] = useState(roomData);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [viewingRoom, setViewingRoom] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
  });

  const { addNotification } = useNotification();

  const housekeepingStatuses = JSON.parse(localStorage.getItem('housekeepingStatuses')) || {};

  const handleBook = (bookingDetails) => {
    const newBooking = {
      ...bookingDetails,
      room: selectedRoom,
      roomNumber: selectedRoom.id,
      bookedAt: new Date().toISOString(),
    };

    onBookingConfirmed(newBooking);

    addNotification(
      `🛏️ Room #${selectedRoom.id} booked by ${bookingDetails.name?.trim() || 'a guest'}`,
      'success'
    );

    setSelectedRoom(null);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const isRoomBooked = (roomId) => bookings.some((b) => b.room?.id === roomId);

  // Calculate counts for status card
  const totalRoomsCount = rooms.length;
  const bookedRoomsCount = rooms.filter((r) => isRoomBooked(r.id)).length;
  const availableRoomsCount = rooms.filter(
    (r) =>
      !isRoomBooked(r.id) &&
      !housekeepingStatuses[r.id]?.isUnderMaintenance
  ).length;

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filter.type ? room.type === filter.type : true;
    const matchesMin = filter.minPrice ? room.price >= Number(filter.minPrice) : true;
    const matchesMax = filter.maxPrice ? room.price <= Number(filter.maxPrice) : true;

    const isBooked = isRoomBooked(room.id);
    const isUnderMaintenance = housekeepingStatuses[room.id]?.isUnderMaintenance;

    let matchesStatus = true;

    if (filter.status === 'Available') {
      matchesStatus = !isBooked && !isUnderMaintenance;
    } else if (filter.status === 'Booked') {
      matchesStatus = isBooked;
    } else if (filter.status === 'Maintenance') {
      matchesStatus = isUnderMaintenance;
    }

    return matchesSearch && matchesType && matchesStatus && matchesMin && matchesMax;
  });

  return (
    <div className="flex flex-col w-full p-4 space-y-6 ml-0 md:ml-[240px] overflow-x-hidden -mt-10">
      {showSuccessPopup && (
        <div className="fixed left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm top-4">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 border border-green-500">
            <FaCheckCircle className="text-white text-2xl" />
            <span className="text-base font-semibold">Booking Confirmed!</span>
          </div>
        </div>
      )}

      <div className="mt-4 md:mt-6 flex items-center gap-2 text-white text-2xl md:text-3xl font-bold justify-center md:justify-start">
        <FaBed className="text-blue-400" />
        <h2>Our Rooms</h2>
      </div>

      {/* Search + Status Card Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4 w-full max-w-[950px]">
        <input
          type="text"
          placeholder="Search by Room ID or Guest Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/2"
        />

        {/* Status Card */}
        <div className="flex space-x-4 bg-[#1E293B] text-white rounded-lg shadow p-3 w-full sm:w-auto justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold">Total Rooms</p>
            <p className="text-lg font-bold">{totalRoomsCount}</p>
          </div>
          <div className="text-center border-l border-gray-600 pl-4">
            <p className="text-sm font-semibold">Booked Rooms</p>
            <p className="text-lg font-bold text-red-500">{bookedRoomsCount}</p>
          </div>
          <div className="text-center border-l border-gray-600 pl-4">
            <p className="text-sm font-semibold">Available Rooms</p>
            <p className="text-lg font-bold text-green-400">{availableRoomsCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap bg-white dark:bg-[#1E293B] rounded-lg shadow p-4 w-full md:w-[800px]">
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>

        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filter.minPrice}
          onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
          className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filter.maxPrice}
          onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
          className="p-2 rounded bg-gray-100 dark:bg-[#334155] text-sm w-full sm:w-auto"
        />

        <button
          onClick={() =>
            setFilter({ type: '', status: '', minPrice: '', maxPrice: '' })
          }
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:w-[950px]">
        {filteredRooms.map((room) => {
          const isBooked = isRoomBooked(room.id);
          const isUnderMaintenance = housekeepingStatuses[room.id]?.isUnderMaintenance;
          const canBook = !isBooked && !isUnderMaintenance;

          const status = isUnderMaintenance
            ? 'Maintenance'
            : isBooked
            ? 'Booked'
            : 'Available';

          const statusColor =
            status === 'Booked'
              ? 'text-red-500'
              : status === 'Maintenance'
              ? 'text-orange-400'
              : 'text-green-400';

          const buttonColor =
            status === 'Booked'
              ? 'bg-red-500 cursor-not-allowed'
              : status === 'Maintenance'
              ? 'bg-orange-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700 cursor-pointer';

          return (
            <div
              key={room.id}
              className="bg-[#1E293B] rounded-lg border border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={room.images[0]}
                alt={room.title}
                className="w-full h-32 sm:h-36 object-cover"
              />
              <div className="p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white truncate">{room.title}</h3>
                  <span className={`text-[10px] font-semibold ${statusColor}`}>
                    {status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2">{room.description}</p>
                <div className="text-[10px] text-gray-400 space-y-[2px]">
                  <p>
                    Room ID: <span className="text-white">{room.id}</span>
                  </p>
                  <p>
                    Type: <span className="text-white">{room.type}</span>
                  </p>
                  <p>
                    Price: <span className="text-white">${room.price}/night</span>
                  </p>
                </div>
                <div className="flex space-x-1 pt-2">
                  <button
                    className={`flex-1 text-white text-[11px] px-2 py-[6px] rounded transition ${buttonColor}`}
                    onClick={() => canBook && setSelectedRoom(room)}
                    disabled={!canBook}
                  >
                    {status === 'Available' ? 'Book' : status}
                  </button>
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-2 py-[6px] rounded transition cursor-pointer"
                    onClick={() => setViewingRoom(room)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onBookingConfirmed={handleBook}
        />
      )}

      {viewingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#1E293B] border border-gray-700 p-6 rounded-lg max-w-3xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                Room Details: {viewingRoom.title}
              </h2>
              <button
                className="text-red-400 hover:text-red-600 font-bold text-xl cursor-pointer"
                onClick={() => setViewingRoom(null)}
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={viewingRoom.images[0]}
                alt={viewingRoom.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>ID:</strong> {viewingRoom.id}</p>
                <p><strong>Type:</strong> {viewingRoom.type}</p>
                <p><strong>Price:</strong> ${viewingRoom.price}/night</p>
                <p><strong>Status:</strong> {isRoomBooked(viewingRoom.id) ? 'Booked' : housekeepingStatuses[viewingRoom.id]?.isUnderMaintenance ? 'Maintenance' : 'Available'}</p>
                <p><strong>Description:</strong> {viewingRoom.description}</p>
                <p><strong>Amenities:</strong> {viewingRoom.amenities?.join(', ') || 'N/A'}</p>
                <p><strong>Guests:</strong> Max {viewingRoom.maxGuests}</p>
                <p><strong>Size:</strong> {viewingRoom.size} sq ft</p>
                <p><strong>Beds:</strong> {viewingRoom.beds}</p>
              </div>
            </div>
            <div className="text-right mt-4">
              <button
                onClick={() => setViewingRoom(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
