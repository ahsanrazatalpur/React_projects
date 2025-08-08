import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Search from './components/Search';
import Playlist from './components/Playlist';
import Library from './components/Library'; // ✅ Import Library
import MusicPlayer from './components/MusicPlayer';
import { usePlayer } from './components/PlayerContext';
import "./App.css";

const App = () => {
  const { currentSong } = usePlayer();
  console.log("App currentSong:", currentSong);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="library" element={<Library />} /> {/* ✅ Add this line */}
        </Route>
      </Routes>

      {/* Show MusicPlayer only when a song is selected */}
      {currentSong && <MusicPlayer song={currentSong} />}
    </>
  );
};

export default App;
