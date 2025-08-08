// // src/components/Notification.jsx
// import React, { useState } from 'react';
// import { FaBell } from 'react-icons/fa';
// import { useNotification } from './NotificationContext';

// const Notification = () => {
//   const {
//     notifications,
//     unreadCount,
//     clearAllNotifications,
//     markAllAsRead,
//   } = useNotification();

//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//     markAllAsRead();
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <button
//         onClick={toggleDropdown}
//         className="relative text-white text-xl p-2 focus:outline-none"
//       >
//         <FaBell />
//         {unreadCount > 0 && (
//           <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50">
//           <div className="p-2 font-semibold border-b text-gray-800 flex justify-between items-center">
//             Notifications
//             <button
//               onClick={clearAllNotifications}
//               className="text-xs text-red-600 hover:underline"
//             >
//               Clear All
//             </button>
//           </div>
//           <ul className="max-h-60 overflow-y-auto">
//             {notifications.length === 0 ? (
//               <li className="p-2 text-gray-500 text-sm">No notifications</li>
//             ) : (
//               notifications.map((n) => (
//                 <li key={n.id} className="p-2 border-b text-sm text-gray-700">
//                   <div>{n.message}</div>
//                   <div className="text-xs text-gray-400">{n.timestamp}</div>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notification;
