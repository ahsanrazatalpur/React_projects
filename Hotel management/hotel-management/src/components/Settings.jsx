import React, { useState } from 'react';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [passwordErrors, setPasswordErrors] = useState('');

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    inApp: true,
    quietHoursStart: '',
    quietHoursEnd: '',
  });

  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const [bookingPolicy, setBookingPolicy] = useState({
    cancellationWindow: 24,
    maxGuests: 2,
  });

  const [roomPricing, setRoomPricing] = useState({
    seasonalRates: '',
  });

  const [staff, setStaff] = useState([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Receptionist' },
  ]);

  const [autoUpdate, setAutoUpdate] = useState(true);

  // Handlers
  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordErrors("New password and confirm password don't match");
      return false;
    }
    setPasswordErrors('');
    return true;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      alert('Password updated!');
      setPasswords({ current: '', new: '', confirm: '' });
    }
  };

  return (
    <div
      className="p-1 pr-6 min-h-screen w-full max-w-screen-xl mx-auto mt-10 md:mt-0 md:ml-[250px] md:w-[calc(100%-250px)]"


    >
      <h1 className="text-3xl font-bold mb-6 text-white">Settings</h1>

      {/* Profile Settings - full width */}
      <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="space-y-4 max-w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userInfo.name}
            onChange={handleUserInfoChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleUserInfoChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={userInfo.phone}
            onChange={handleUserInfoChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        {/* Change Password */}
        <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-2 max-w-full">
          <h3 className="font-semibold">Change Password</h3>
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={passwords.current}
            onChange={handlePasswordChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
            required
          />
          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={passwords.new}
            onChange={handlePasswordChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
            required
          />
          {passwordErrors && <p className="text-red-500">{passwordErrors}</p>}
          <button
            type="submit"
            className="mt-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* Other settings in 2 columns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Notification Preferences */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
              />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
              />
              <span>SMS Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.inApp}
                onChange={() => setNotifications({ ...notifications, inApp: !notifications.inApp })}
              />
              <span>In-app Notifications</span>
            </label>

            <div className="mt-4">
              <label>Quiet Hours Start</label>
              <input
                type="time"
                value={notifications.quietHoursStart}
                onChange={(e) =>
                  setNotifications({ ...notifications, quietHoursStart: e.target.value })
                }
                className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
              />
            </div>
            <div>
              <label>Quiet Hours End</label>
              <input
                type="time"
                value={notifications.quietHoursEnd}
                onChange={(e) =>
                  setNotifications({ ...notifications, quietHoursEnd: e.target.value })
                }
                className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600"
              />
            </div>
          </div>
        </section>

        {/* Language & Region */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">Language & Region</h2>
          <label>
            Language
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 mt-1"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              {/* Add more languages */}
            </select>
          </label>
          <label className="block mt-4">
            Timezone
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 mt-1"
            >
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Asia/Karachi">Asia/Karachi</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
            </select>
          </label>
        </section>

        {/* Booking Settings */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">Booking Settings</h2>
          <label>
            Cancellation Window (hours)
            <input
              type="number"
              value={bookingPolicy.cancellationWindow}
              onChange={(e) =>
                setBookingPolicy({ ...bookingPolicy, cancellationWindow: Number(e.target.value) })
              }
              className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 mt-1"
            />
          </label>
          <label className="block mt-4">
            Max Guests
            <input
              type="number"
              value={bookingPolicy.maxGuests}
              onChange={(e) =>
                setBookingPolicy({ ...bookingPolicy, maxGuests: Number(e.target.value) })
              }
              className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 mt-1"
            />
          </label>
        </section>

        {/* User Management */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <ul className="space-y-2 max-h-48 overflow-auto">
            {staff.map(({ id, name, role }) => (
              <li key={id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                <span>{name}</span>
                <span className="italic text-sm">{role}</span>
              </li>
            ))}
          </ul>
          {/* Add your add/edit/remove staff UI here */}
        </section>

        {/* System Settings */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={() => setAutoUpdate(!autoUpdate)}
            />
            <span>Enable Auto-Updates</span>
          </label>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => alert('Backup and restore feature coming soon!')}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Backup Data
            </button>
            <button
              onClick={() => alert('Restore feature coming soon!')}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Restore Data
            </button>
          </div>
        </section>

        {/* Payment Settings */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
          <p>Payment gateway integration coming soon.</p>
        </section>

        {/* Miscellaneous */}
        <section className="bg-[#1E293B] p-6 rounded-lg shadow text-white w-full">
          <h2 className="text-xl font-semibold mb-4">Miscellaneous</h2>
          <p>App Version: 1.0.0</p>
          <a
            href="/privacy"
            className="underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <br />
          <a
            href="/terms"
            className="underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </a>
        </section>

      </div>
    </div>
  );
};

export default Settings;
