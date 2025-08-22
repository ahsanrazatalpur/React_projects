// src/components/ContinueWatching.jsx
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

const ContinueWatching = ({ onMovieClick }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const rowRef = useRef(null);

  // Load recently played from localStorage
  useEffect(() => {
    const loadRecentlyPlayed = () => {
      const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      setRecentlyPlayed(stored);
    };

    const handleProgressUpdate = () => {
      setRecentlyPlayed((prev) => [...prev]); // trigger re-render
    };

    loadRecentlyPlayed();

    window.addEventListener("recentlyPlayedUpdated", loadRecentlyPlayed);
    window.addEventListener("watchedProgressUpdated", handleProgressUpdate);

    return () => {
      window.removeEventListener("recentlyPlayedUpdated", loadRecentlyPlayed);
      window.removeEventListener("watchedProgressUpdated", handleProgressUpdate);
    };
  }, []);

  // Scroll handling
  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction) => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  // Get movie progress
  const getProgress = (movieId) => {
    const progressData = JSON.parse(localStorage.getItem("watchedProgress")) || {};
    const movieProgress = progressData[movieId];

    if (!movieProgress) return 0; // ✅ changed fallback from 40 to 0

    if (movieProgress.progressPercent !== undefined) {
      return Math.min(movieProgress.progressPercent, 100);
    }

    const { progress = 0, duration = 0 } = movieProgress;
    if (!duration) return 0;

    return Math.min((progress / duration) * 100, 100);
  };

  // Attach scroll listener
  useEffect(() => {
    const currentRef = rowRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    setTimeout(checkScroll, 100);
    return () => {
      if (currentRef) currentRef.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [recentlyPlayed]);

  if (!recentlyPlayed.length) {
    return (
      <div className="text-gray-400 text-center py-6">
        No movies yet — start watching something!
      </div>
    );
  }

  return (
    <div className="continue-watching-container bg-black py-6 px-4 relative">
      <h2 className="text-white text-2xl font-bold mb-4">Continue Watching</h2>

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black p-2 rounded-full shadow-lg"
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </button>
      )}

      <div ref={rowRef} className="flex overflow-x-auto space-x-4 scroll-smooth py-2">
        {recentlyPlayed.map((movie) => {
          const progress = getProgress(movie.id);
          return (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] group cursor-pointer"
              onClick={() => onMovieClick && onMovieClick(movie)}
            >
              <div className="relative">
                <img
                  src={movie.image || (movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_POSTER)}
                  alt={movie.title || movie.name}
                  className="w-full h-auto object-cover rounded-lg"
                />

                {progress > 0 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {Math.round(progress)}%
                  </div>
                )}
              </div>

              <div className="w-full h-2 bg-gray-800 rounded mt-1 overflow-hidden">
                <div className="h-2 bg-red-600 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>

              <p className="text-white text-sm font-semibold mt-2 truncate">{movie.title || movie.name}</p>
            </div>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="text-white w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ContinueWatching;
