import React, { useRef, useState, useEffect } from 'react';
import { usePlayer } from './PlayerContext';
import Songs from './Songs';

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';

const MusicPlayer = ({ song }) => {
  const { setCurrentSong } = usePlayer();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const currentIndex = Songs.findIndex(s => s.id === song?.id);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (!audio.loop) {
        const nextIndex = (currentIndex + 1) % Songs.length;
        setCurrentSong(Songs[nextIndex]);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [song, currentIndex, setCurrentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    audio.src = song.audio;
    audio.load();

    if (isPlaying) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Audio play error:', err);
          setIsPlaying(false);
        });
    }
  }, [song, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Play error:", err));
    }
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = !isLooping;
    setIsLooping(audio.loop);
  };

  const changeSpeed = () => {
    const newRate = playbackRate === 2 ? 1 : playbackRate + 0.5;
    audioRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted || volume === 0) {
      audio.volume = 1;
      setVolume(1);
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? Songs.length - 1 : currentIndex - 1;
    setCurrentSong(Songs[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % Songs.length;
    setCurrentSong(Songs[nextIndex]);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!song) return null;

  return (
    <div className="music-player">
      <audio ref={audioRef} />

      <div className="player-top">
        <div className="progress-bar-wrapper" onClick={handleProgressClick}>
          <div className="progress-bar">
            <div
              className="progress-filled"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="progress-times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="player-bottom" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="album-art-container">
          <div className={`album-art ${isPlaying ? 'spinning' : ''}`}>
            <img
              src={song.image || song.cover}
              alt="Album"
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default_album.png'; // fallback image in public folder
              }}
            />
          </div>
        </div>

        <div className="controls" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', gap: '12px' }}>
          <button onClick={toggleLoop} className={isLooping ? 'active' : ''} title="Toggle Loop">
            <FaRedo size={18} />
          </button>
          <button onClick={handlePrev} title="Previous">
            <FaStepBackward size={18} />
          </button>
          <button onClick={togglePlay} title="Play / Pause">
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button onClick={handleNext} title="Next">
            <FaStepForward size={18} />
          </button>
          <button onClick={changeSpeed} className="speed-button" title="Change Playback Speed">
            x{playbackRate}
          </button>
        </div>

        <div className="volume-control" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '8px' }}>
          <button onClick={toggleMute} title="Mute / Unmute">
            {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={{ width: '100px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
