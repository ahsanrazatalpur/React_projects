import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useOutletContext } from "react-router-dom"; // Added import

const API_KEY = "ddafa23fa04bdad5851261b5c37445b3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const genresList = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romantic" },
  { id: 878, name: "Sci-Fi" },
  { id: 18, name: "Drama" },
];

export default function Genres() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreImages, setGenreImages] = useState({});

  // ✅ FIXED: Get watchlist and toggle function from App.js context
  const { watchlist, toggleInWatchlist } = useOutletContext();

  useEffect(() => {
    const fetchGenreImages = async () => {
      try {
        const imagesObj = {};

        await Promise.all(
          genresList.map(async (genre) => {
            if (genre.id === 10749) {
              const res = await axios.get(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=14%20and%20Under&language=en-US&page=1`
              );
              const movie = res.data.results.find((m) => m.poster_path);
              imagesObj[genre.id] = movie
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : null;
            } else {
              const res = await axios.get(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&sort_by=popularity.desc&page=1`
              );
              const firstMovie = res.data.results.find((m) => m.poster_path);
              imagesObj[genre.id] = firstMovie
                ? `${IMAGE_BASE_URL}${firstMovie.poster_path}`
                : null;
            }
          })
        );

        setGenreImages(imagesObj);
      } catch (err) {
        console.error("Failed to fetch genre images", err);
      }
    };

    fetchGenreImages();
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;

    const fetchMoviesByGenre = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre.id}&language=en-US`
        );
        const filteredMovies = res.data.results.filter((m) => m.poster_path);
        setMovies(filteredMovies);
      } catch (err) {
        setError("Failed to load movies for this genre.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  return (
    <div style={{ backgroundColor: "#000", padding: "20px 16px" }}>
      <h2
        style={{
          color: "#fff",
          fontWeight: "700",
          fontSize: "1.5rem",
          marginBottom: 20,
          userSelect: "none",
          letterSpacing: "1.5px",
          width: "100%",
          textAlign: "left",
        }}
      >
        Genres
      </h2>

      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 12,
          paddingLeft: 35,
          scrollbarWidth: "thin",
          scrollbarColor: "#e3342f transparent",
          scrollBehavior: "smooth",
        }}
      >
        {genresList.map((genre) => (
          <div
            key={genre.id}
            onClick={() => setSelectedGenre(genre)}
            style={{
              cursor: "pointer",
              border:
                selectedGenre?.id === genre.id
                  ? "3px solid #e3342f"
                  : "2px solid #e3342f",
              borderRadius: 12,
              overflow: "hidden",
              width: 180,
              height: 130,
              position: "relative",
              backgroundColor: selectedGenre?.id === genre.id ? "#e3342f" : "#222",
              flexShrink: 0,
              boxShadow:
                selectedGenre?.id === genre.id
                  ? "0 8px 24px rgba(227, 52, 47, 0.8)"
                  : "0 2px 8px rgba(227, 52, 47, 0.3), 0 1px 3px rgba(0,0,0,0.7)",
              transition: "box-shadow 0.3s, background-color 0.3s, border 0.3s",
            }}
            onMouseEnter={(e) => {
              if (selectedGenre?.id !== genre.id)
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(227, 52, 47, 0.7), 0 4px 8px rgba(0,0,0,0.9)";
            }}
            onMouseLeave={(e) => {
              if (selectedGenre?.id !== genre.id)
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(227, 52, 47, 0.3), 0 1px 3px rgba(0,0,0,0.7)";
            }}
          >
            {genreImages[genre.id] ? (
              <img
                src={genreImages[genre.id]}
                alt={genre.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  borderRadius: 10,
                  display: "block",
                  filter: selectedGenre?.id === genre.id ? "brightness(0.8)" : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#333",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 20,
                  borderRadius: 10,
                  userSelect: "none",
                }}
              >
                {genre.name}
              </div>
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "700",
                fontSize: 20,
                textShadow: "0 0 5px rgba(0,0,0,0.9)",
                userSelect: "none",
                pointerEvents: "none",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {genre.name}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        {loading && (
          <p style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Loading movies...
          </p>
        )}
        {error && (
          <p style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </p>
        )}
        {!loading && !error && movies.length > 0 && (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: 12,
              paddingBottom: 12,
              scrollBehavior: "smooth",
            }}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                title={movie.title}
                // ✅ FIXED: Use the correct prop names and connect to main App.js state
                isInList={watchlist.some(m => m.id === movie.id)} // Check if movie is in main watchlist
                onToggleList={() => toggleInWatchlist(movie)} // Use the main toggle function
              />
            ))}
          </div>
        )}
        {!loading && !error && movies.length === 0 && selectedGenre && (
          <p style={{ color: "white", textAlign: "center" }}>
            No movies found for "{selectedGenre.name}"
          </p>
        )}
      </div>
    </div>
  );
}