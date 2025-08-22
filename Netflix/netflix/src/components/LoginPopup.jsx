import React, { useState } from "react";

export default function LoginPopup({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (username === "ahsanraza" && password === "30052003") {
      const userData = {
        username: "ahsanraza",
        fullName: "Ahsan Raza Talpur",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
      };

      // Send data to parent for state and persistence
      onLogin(userData);

      // Close the popup
      onClose();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-8 rounded-md w-80 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl font-bold hover:text-red-600 transition-colors duration-300"
          aria-label="Close login popup"
        >
          &times;
        </button>

        <h2 className="text-white text-2xl mb-4 text-center font-bold">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Hint */}
          <p className="text-gray-400 text-sm italic">
            Hint: admin = <span className="font-semibold">ahsanraza</span>, password ={" "}
            <span className="font-semibold">30052003</span>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold text-white transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
