import React, { useState } from 'react';
import Songs from './Songs';
import { usePlayer } from './PlayerContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const { currentSong, setCurrentSong } = usePlayer();

  const playSong = (song) => {
    if (currentSong && currentSong.id === song.id) {
      setCurrentSong(null); // Pause if same song clicked
    } else {
      setCurrentSong(song); // Play new song
    }
  };

  const filteredSongs = (Songs || []).filter(song => {
    const name = song.name || song.title || '';
    const artist = song.artist || '';
    return (
      name.toLowerCase().includes(query.toLowerCase()) ||
      artist.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="search-page">
      <h1>Search</h1>

      {/* Input Field */}
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by song or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <button className="clear-btn" onClick={() => setQuery('')}>×</button>
        )}
      </div>

      {/* Search Results */}
      <div className="search-results">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            const name = song.name || song.title;
            const image = song.image || song.cover;

            return (
              <div
                key={`${song.id}-${index}`}
                className={`song-card ${currentSong?.id === song.id ? 'playing' : ''}`}
                onClick={() => playSong(song)}
              >
                <img
                  src={image}
                  alt={name}
                  className="song-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100'; // fallback if image not found
                  }}
                />
                <div className="song-info">
                  <p className="song-name">{name}</p>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-results">No matching songs found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
