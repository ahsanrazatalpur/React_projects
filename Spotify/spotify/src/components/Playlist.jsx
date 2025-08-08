// src/components/Playlist.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Playlist = () => {
  const { id } = useParams();

  return (
    <div className="playlist-page">
      <h2>Playlist ID: {id}</h2>
      {/* You can fetch and render playlist data based on ID here */}
    </div>
  );
};

export default Playlist;
