import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

const MovieCard = ({
  id,
  image,
  title,
  name,
  poster_path,
  backdrop_path,
  original_title,
  original_name,
  overview,
  vote_average,
  videoSrc,
  posterUrl: savedPosterUrl,
  showProgress = false,
  isInList = false,
  onToggleList = null,
}) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const posterUrl =
    savedPosterUrl ||
    (poster_path || backdrop_path
      ? `${IMAGE_BASE_URL}${poster_path || backdrop_path}`
      : image || FALLBACK_POSTER);

  const movieTitle =
    title || name || original_title || original_name || "Untitled";

  // Load reviews from localStorage
  useEffect(() => {
    try {
      const savedReviews =
        JSON.parse(localStorage.getItem(`movie-${id}-reviews`)) || [];
      setReviews(savedReviews);
    } catch {
      setReviews([]);
    }
  }, [id]);

  // Load saved progress
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("watchedProgress")) || {};
      if (saved[id]) setProgress(saved[id].progress || 0);
    } catch {
      setProgress(0);
    }
  }, [id]);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current?.duration) return;
    const newProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    const roundedProgress = Math.floor(newProgress);
    setProgress(roundedProgress);
    const saved = JSON.parse(localStorage.getItem("watchedProgress")) || {};
    saved[id] = { progress: roundedProgress, lastWatched: Date.now() };
    localStorage.setItem("watchedProgress", JSON.stringify(saved));
    window.dispatchEvent(new Event("watchedProgressUpdated"));
  };

  const handleNewReview = (newReview) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`movie-${id}-reviews`, JSON.stringify(updatedReviews));
  };

  const handleAddRemove = (e) => {
    e.stopPropagation();
    if (onToggleList) onToggleList();
  };

  const handleCardClick = () => {
    const movieData = {
      id,
      title: movieTitle,
      poster_path,
      backdrop_path,
      image,
      overview,
      vote_average,
      videoSrc,
    };
    const saved = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    const filtered = saved.filter((m) => m.id !== id);
    const updated = [movieData, ...filtered].slice(0, 10);
    localStorage.setItem("recentlyPlayed", JSON.stringify(updated));
    window.dispatchEvent(new Event("recentlyPlayedUpdated"));
    navigate(`/movies/${id}`);
  };

  const StarIcon = ({ filled }) => (
    <svg
      className="w-4 h-4 inline-block"
      fill={filled ? "#FFD700" : "none"}
      stroke="#FFD700"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <polygon points="12,2 15,10 23,10 17,15 19,22 12,18 5,22 7,15 1,10 9,10" />
    </svg>
  );

  // Average rating calculation in scale of 10
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length) * 2
      : 0;
  const roundedAverage = Math.round(averageRating * 10) / 10; // e.g., 7.8/10

  // Number of filled stars based on averageRating out of 10
  const filledStars = Math.round((averageRating / 10) * 5);

  return (
    <div className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] mr-4 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div
        className="relative pb-[150%] rounded-lg overflow-hidden shadow-md bg-gray-900"
        onClick={handleCardClick}
      >
        <img
          src={posterUrl}
          alt={movieTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className="hidden"
            preload="metadata"
            onTimeUpdate={handleVideoTimeUpdate}
            onLoadedMetadata={() => {
              if (videoRef.current && progress > 0) {
                videoRef.current.currentTime =
                  (progress / 100) * videoRef.current.duration;
              }
            }}
          />
        )}

        {showProgress && progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-700 rounded">
            <div
              className="h-2 bg-red-600 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          onClick={handleAddRemove}
          className={`absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded shadow-md transition-colors ${
            isInList
              ? "bg-gray-700 hover:bg-gray-800"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isInList ? "Remove from List" : "+ My List"}
        </button>
      </div>

      <p className="mt-2 text-center text-sm font-semibold text-white truncate">
        {movieTitle}
      </p>

      {/* Average stars + numeric rating out of 10 + review count */}
      {reviews.length > 0 && (
        <p className="text-center text-xs mt-1 flex justify-center items-center space-x-1">
          <span className="text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < filledStars} />
            ))}
          </span>
          <span className="text-gray-300">{roundedAverage}/10</span>
          <span className="text-gray-400">({reviews.length})</span>
        </p>
      )}

      {/* Toggle to see all reviews */}
      {reviews.length > 0 && (
        <button
          className="text-blue-400 text-xs mt-1 underline"
          onClick={(e) => {
            e.stopPropagation();
            setShowAllReviews(!showAllReviews);
          }}
        >
          {showAllReviews ? "Hide Reviews" : "See All Reviews"}
        </button>
      )}

      {/* All reviews list */}
      {showAllReviews && (
        <div className="text-gray-300 text-xs mt-1 max-h-32 overflow-y-auto px-1">
          {reviews.map((r, idx) => (
            <div key={idx} className="border-b border-gray-700 py-1">
              <p className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < Math.round((r.rating || 0) / 2)} />
                ))}
                <span className="ml-1 text-gray-300">{((r.rating || 0) * 2).toFixed(1)}/10</span>
              </p>
              <p>{r.reviewText}</p>
            </div>
          ))}
        </div>
      )}

      {/* Review form */}
      <div className="mt-1 w-full" onClick={(e) => e.stopPropagation()}>
        <ReviewForm movieId={id} onSubmit={handleNewReview} />
      </div>
    </div>
  );
};

export default MovieCard;
