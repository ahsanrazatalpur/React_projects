import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

const ICON_COLOR = "#FFFFFF"; // white

// Helper function for button styling
const buttonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Icons (same as before)
const PlayIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="28" height="28">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="28" height="28">
    <rect x="6" y="5" width="4" height="14" />
    <rect x="14" y="5" width="4" height="14" />
  </svg>
);
const MuteIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="24" height="24">
    <path d="M16 7v10l-6-5V7h6z" />
    <line
      x1="19"
      y1="5"
      x2="5"
      y2="19"
      stroke={ICON_COLOR}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const VolumeIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="24" height="24">
    <path d="M7 9v6h4l5 5V4l-5 5H7z" />
  </svg>
);
const FullscreenIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="24" height="24">
    <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M3 16v3a2 2 0 002 2h3M21 16v3a2 2 0 01-2 2h-3" />
  </svg>
);
const ExitFullscreenIcon = () => (
  <svg
    fill={ICON_COLOR}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke={ICON_COLOR}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const SkipBackIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 4L4 12l8 8V4z" />
    <path d="M20 4l-8 8 8 8V4z" fill="none" />
  </svg>
);
const SkipForwardIcon = () => (
  <svg fill={ICON_COLOR} viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 4l8 8-8 8V4z" />
    <path d="M4 4l8 8-8 8V4z" fill="none" />
  </svg>
);
const CloseIcon = () => (
  <svg
    fill={ICON_COLOR}
    viewBox="0 0 24 24"
    width="28"
    height="28"
    stroke={ICON_COLOR}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const VideoPlayer = ({ movieId, poster, title, onClose }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  let hideControlsTimeout = useRef(null);

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/";

  useEffect(() => {
    if (!movieId || !TMDB_API_KEY) {
      console.error("Movie ID or API Key is missing.");
      setLoading(false);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${movieId}/videos`,
          {
            params: {
              api_key: TMDB_API_KEY,
            },
          }
        );

        const videos = response.data.results;
        const trailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        if (trailer) {
          setVideoKey(trailer.key);
        } else {
          console.warn("No trailer found for this movie.");
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId, TMDB_API_KEY]);

  const formatTime = (time) => {
    if ((!time && time !== 0) || isNaN(time)) return "0:00";
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${
        secs < 10 ? "0" : ""
      }${secs}`;
    }
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onTimeUpdate = () => {
      if (!isSeeking) {
        const ct = video.currentTime || 0;
        const dur = video.duration || 0;
        setCurrentTime(ct);
        setProgress(dur ? ct / dur : 0);
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);

    const onPlay = () => {
      setIsPlaying(true);
    };
    const onPause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };
    const onVolumeChange = () => {
      setIsMuted(video.muted);
      setVolume(video.volume);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolumeChange);

    const onFsChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (!fs) setShowControls(true);
    };
    document.addEventListener("fullscreenchange", onFsChange);

    setIsMuted(video.muted);
    setVolume(video.volume);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolumeChange);
      document.removeEventListener("fullscreenchange", onFsChange);
    };
  }, [isSeeking, videoKey]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      try {
        await video.play();
        setIsPlaying(true);
        showControlsForFiveSeconds();
      } catch (err) {
        console.error("Autoplay prevented or play() failed:", err);
        setShowControls(true);
      }
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) setVolume(video.volume);
  };

  const onVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    video.muted = newVolume === 0;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const onSeekChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime(newProgress * duration);
  };
  const onSeekMouseDown = () => setIsSeeking(true);
  const onSeekMouseUp = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const newProgress = parseFloat(e.target.value);
    video.currentTime = newProgress * duration;
    setIsSeeking(false);
  };

  const toggleFullscreen = useCallback(() => {
    const videoContainer = videoRef.current;
    if (videoContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainer.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
      }
    }
  }, []);

  const onPlaybackRateChange = (e) => {
    const rate = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setPlaybackRate(rate);
  };

  const showControlsForFiveSeconds = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 5000);
  };

  const handleUserInteraction = useCallback(() => {
    if (isPlaying) {
      showControlsForFiveSeconds();
    } else {
      setShowControls(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (!videoRef.current) return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "ArrowRight":
          videoRef.current.currentTime = Math.min(
            (videoRef.current.currentTime || 0) + 5,
            duration || 0
          );
          break;
        case "ArrowLeft":
          videoRef.current.currentTime = Math.max(
            (videoRef.current.currentTime || 0) - 5,
            0
          );
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Escape": {
          if (document.fullscreenElement && document.exitFullscreen) {
            try {
              await document.exitFullscreen();
            } catch (err) {
              console.error("Error exiting fullscreen:", err);
            }
          } else if (onClose) {
            onClose();
          }
          break;
        }
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [duration, toggleFullscreen, onClose]);

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max((video.currentTime || 0) - 10, 0);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = duration || video.duration || 0;
    video.currentTime = Math.min((video.currentTime || 0) + 10, dur);
  };

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          color: "white",
        }}
      >
        Loading Trailer...
      </div>
    );
  }

  if (!videoKey) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          color: "white",
          flexDirection: "column",
        }}
      >
        <p>No trailer found for this movie. 😥</p>
        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            background: "white",
            color: "black",
            border: "none",
            borderRadius: 5,
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserInteraction}
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 960,
          width: "100%",
          backgroundColor: "#111",
          borderRadius: 10,
          boxShadow: "0 0 15px rgba(255,255,255,0.15)",
          overflow: "hidden",
        }}
      >
        <button
          onClick={async (e) => {
            e.stopPropagation();
            try {
              if (document.fullscreenElement) {
                await document.exitFullscreen();
              }
            } catch (err) {
              console.error("Error exiting fullscreen:", err);
            }
            if (onClose) onClose();
          }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
            zIndex: 10,
          }}
          aria-label="Close video"
          title="Close"
        >
          <CloseIcon />
        </button>

        <video
          ref={videoRef}
          src={`${YOUTUBE_EMBED_URL}${videoKey}?autoplay=1&controls=0&mute=1`}
          poster={poster}
          onClick={togglePlay}
          preload="metadata"
          playsInline
          muted={isMuted}
          style={{
            width: "100%",
            maxHeight: "540px",
            backgroundColor: "#000",
            cursor: "pointer",
            display: "block",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 20px",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            display: showControls ? "flex" : "none",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={Number.isFinite(progress) ? progress : 0}
            onChange={onSeekChange}
            onMouseDown={onSeekMouseDown}
            onMouseUp={onSeekMouseUp}
            style={{
              width: "100%",
              cursor: "pointer",
              appearance: "none",
              height: 6,
              borderRadius: 3,
              background: `linear-gradient(to right, ${ICON_COLOR} 0%, ${ICON_COLOR} ${
                (Number.isFinite(progress) ? progress : 0) * 100
              }%, #444 ${(Number.isFinite(progress) ? progress : 0) * 100}%, #444 100%)`,
            }}
            aria-label="Seek"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <button
                onClick={skipBackward}
                style={buttonStyle}
                aria-label="Back 10 seconds"
                title="Back 10s"
              >
                <SkipBackIcon />
              </button>
              <button
                onClick={togglePlay}
                style={buttonStyle}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={skipForward}
                style={buttonStyle}
                aria-label="Forward 10 seconds"
                title="Forward 10s"
              >
                <SkipForwardIcon />
              </button>
              <button
                onClick={toggleMute}
                style={buttonStyle}
                aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                title={isMuted || volume === 0 ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={onVolumeChange}
                style={{
                  width: 100,
                  cursor: "pointer",
                  appearance: "none",
                  height: 6,
                  borderRadius: 3,
                  background: `linear-gradient(to right, ${ICON_COLOR} 0%, ${ICON_COLOR} ${
                    volume * 100
                  }%, #444 ${volume * 100}%, #444 100%)`,
                }}
                aria-label="Volume"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <select
                value={playbackRate}
                onChange={onPlaybackRateChange}
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: 5,
                  border: `1.5px solid ${ICON_COLOR}`,
                  padding: "4px 10px",
                  background: "#111",
                  color: ICON_COLOR,
                }}
                aria-label="Playback speed"
              >
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}x
                  </option>
                ))}
              </select>

              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  userSelect: "none",
                  minWidth: 85,
                  textAlign: "right",
                }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <button
                onClick={toggleFullscreen}
                style={buttonStyle}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;