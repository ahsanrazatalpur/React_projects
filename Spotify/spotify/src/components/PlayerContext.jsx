import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Enhanced setter to log and update recently played
  const setSongAndLog = (song) => {
    console.log("PlayerContext: setCurrentSong called with", song);
    setCurrentSong(song);

    // Update recently played list
    setRecentlyPlayed(prev => {
      const exists = prev.find(s => s.id === song.id);
      if (exists) {
        return [song, ...prev.filter(s => s.id !== song.id)];
      }
      return [song, ...prev].slice(0, 10); // Keep only the last 10 songs
    });
  };

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong: setSongAndLog, recentlyPlayed }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
