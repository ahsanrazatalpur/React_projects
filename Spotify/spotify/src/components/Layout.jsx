import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import { usePlayer } from './PlayerContext';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const { currentSong } = usePlayer();
  console.log("Layout currentSong:", currentSong);

  return (
    <div className="app-layout">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content-wrapper">
        <main className="main-content">
          <Outlet />
        </main>

        {currentSong && (
          <div className={`music-player-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <MusicPlayer song={currentSong} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
