// src/components/RoomDetailsModal.jsx
import React from 'react';

const RoomDetailsModal = ({ room, onClose }) => {
  if (!room) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      style={{ backdropFilter: 'blur(5px) saturate(150%)' }}
    >
      {/* This is the modal content container */}
      <div className="bg-[#1E293B] text-white rounded-xl p-6 w-[95%] max-w-3xl relative overflow-y-auto max-h-[90vh] shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{room.title}</h2>
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-64 object-cover rounded mb-4"
        />

        <p className="mb-2"><strong>Description:</strong> {room.description}</p>
        <p className="mb-2"><strong>Price:</strong> ${room.price}</p>
        <p className="mb-2"><strong>Type:</strong> {room.type}</p>
        <p className="mb-2"><strong>Status:</strong> {room.status}</p>
        <p className="mb-2"><strong>Max Guests:</strong> {room.maxGuests}</p>
        <p className="mb-2"><strong>Beds:</strong> {room.beds}</p>
        <p className="mb-2"><strong>Size:</strong> {room.size} sq ft</p>

        <div className="mb-2">
          <strong>Amenities:</strong>
          <ul className="list-disc list-inside">
            {room.amenities?.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsModal;