// src/components/RoomStatus.jsx
import React, { useEffect, useState } from 'react';
import { FaBroom, FaCheckCircle, FaTimesCircle, FaTools } from 'react-icons/fa';
import roomData from './RoomData';

const RoomStatus = ({
  bookings,
  housekeepingStatuses,
  setHousekeepingStatuses,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Initialize housekeepingStatuses on bookings or first load
  useEffect(() => {
    const updatedStatuses = { ...housekeepingStatuses };

    let changed = false;
    roomData.forEach((room) => {
      if (!updatedStatuses[room.id]) {
        const isBooked = bookings.some((b) => b.room?.id === room.id);
        updatedStatuses[room.id] = {
          cleanlinessStatus: isBooked ? 'Dirty' : 'Clean',
          lastCleaned: isBooked ? '' : new Date().toISOString().slice(0, 10),
          isUnderMaintenance: false,
        };
        changed = true;
      }
    });

    if (changed) {
      setHousekeepingStatuses(updatedStatuses);
    }
    // We intentionally exclude setHousekeepingStatuses from deps to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, housekeepingStatuses]);

  const getRoomCombinedStatus = (room) => {
    const status = housekeepingStatuses[room.id] || {};
    const isBooked = bookings.some((b) => b.room?.id === room.id);

    if (status.isUnderMaintenance) {
      return { label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' };
    }

    return isBooked
      ? { label: 'Booked', color: 'bg-red-100 text-red-800' }
      : { label: 'Available', color: 'bg-green-100 text-green-800' };
  };

  const handleStatusChange = (roomId, type) => {
    const prev = housekeepingStatuses[roomId] || {};
    const updated = { ...prev };

    if (type === 'Maintenance') {
      updated.isUnderMaintenance = !prev.isUnderMaintenance;
      if (!updated.isUnderMaintenance) {
        updated.cleanlinessStatus = 'Dirty';
      }
    } else {
      updated.cleanlinessStatus = type;
      updated.isUnderMaintenance = false;
      if (type === 'Clean') {
        updated.lastCleaned = new Date().toISOString().slice(0, 10);
      }
    }

    const newStatuses = {
      ...housekeepingStatuses,
      [roomId]: updated,
    };

    setHousekeepingStatuses(newStatuses);
  };

  const filteredRooms = roomData
    .map((room) => {
      const localStatus = housekeepingStatuses[room.id] || {};
      const combinedStatus = getRoomCombinedStatus(room);

      return {
        ...room,
        status: combinedStatus,
        cleanliness: localStatus.cleanlinessStatus || 'Clean',
        lastCleaned: localStatus.lastCleaned || 'N/A',
        isUnderMaintenance: localStatus.isUnderMaintenance || false,
      };
    })
    .filter((room) => {
      const matchesSearch =
        room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = filterStatus
        ? room.status.label === filterStatus || room.cleanliness === filterStatus
        : true;

      return matchesSearch && matchesFilter;
    });

  return (
    <div className="flex-1 min-h-screen bg-[#0F172A] text-white p-4 md:p-6 ml-0 md:ml-[223px] -mt-4 w-[1020px]">
      <div className="w-full mx-auto max-w-screen-xl">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
          <div className="flex items-center gap-2 text-white text-2xl md:text-3xl font-bold mb-6">
            <FaBroom className="text-pink-400" />
            <h2>Room Status</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Search by Room ID or Type..."
              className="w-full md:w-1/2 p-2 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-auto p-2 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Clean">Clean</option>
              <option value="Dirty">Dirty</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Room ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Cleanliness
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Last Cleaned
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredRooms.length ? (
                  filteredRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm">{room.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{room.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${room.status.color}`}
                        >
                          {room.status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{room.cleanliness}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{room.lastCleaned}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleStatusChange(room.id, 'Clean')}
                            className="px-2 py-1 bg-green-600 hover:bg-green-700 text-xs text-white rounded flex items-center gap-1"
                          >
                            <FaCheckCircle /> Clean
                          </button>
                          <button
                            onClick={() => handleStatusChange(room.id, 'Dirty')}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-xs text-white rounded flex items-center gap-1"
                          >
                            <FaTimesCircle /> Dirty
                          </button>
                          <button
                            onClick={() => handleStatusChange(room.id, 'Maintenance')}
                            className={`px-2 py-1 text-xs text-white rounded flex items-center gap-1 ${
                              room.isUnderMaintenance
                                ? 'bg-gray-500'
                                : 'bg-yellow-600 hover:bg-yellow-700'
                            }`}
                          >
                            <FaTools /> {room.isUnderMaintenance ? 'Exit' : 'Maintenance'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">
                      No rooms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomStatus;
