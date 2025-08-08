import React, { useState } from 'react';
import { usePlayer } from './PlayerContext';
import Songs from './Songs'; // Assuming full song list

const playlists = [
  {
    id: 1,
    name: "Top Hits",
    songs: Songs.slice(0, 5),
  },
  {
    id: 2,
    name: "New Bollywood",
    songs: Songs.slice(5, 10),
  }
];

const Library = () => {
  const { recentlyPlayed, setCurrentSong } = usePlayer();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const getSongName = (song) => song.name || song.title || 'Unknown Title';
  const getSongImage = (song) => song.image || song.cover || 'https://via.placeholder.com/100';

  return (
    <div className="library-page">
      <h1>Your Library</h1>

      <section>
        <h2>Recently Played</h2>
        {recentlyPlayed.length === 0 ? (
          <p>No songs played yet.</p>
        ) : (
          <div className="song-list">
            {recentlyPlayed.map(song => (
              <div
                key={song.id}
                className="song-card"
                onClick={() => setCurrentSong(song)}
              >
                <img
                  src={getSongImage(song)}
                  alt={getSongName(song)}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
                />
                <div>
                  <p>{getSongName(song)}</p>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Playlists</h2>
        <div className="playlist-list">
          {playlists.map(playlist => {
            // Use first song image as playlist cover or fallback
            const playlistCover = playlist.songs.length > 0 ? getSongImage(playlist.songs[0]) : 'https://via.placeholder.com/150';

            return (
              <div
                key={playlist.id}
                className="playlist-card"
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <img
                  src={playlistCover}
                  alt={playlist.name}
                  className="playlist-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                />
                <h3>{playlist.name}</h3>
                <p>{playlist.songs.length} songs</p>
              </div>
            );
          })}
        </div>

        {selectedPlaylist && (
          <div className="playlist-songs">
            <h3>{selectedPlaylist.name}</h3>
            <div className="song-list">
              {selectedPlaylist.songs.map(song => (
                <div
                  key={song.id}
                  className="song-card"
                  onClick={() => setCurrentSong(song)}
                >
                  <img
                    src={getSongImage(song)}
                    alt={getSongName(song)}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
                  />
                  <div>
                    <p>{getSongName(song)}</p>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Library;
