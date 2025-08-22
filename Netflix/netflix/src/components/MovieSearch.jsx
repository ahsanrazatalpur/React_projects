import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";

const API_KEY = "ddafa23fa04bdad5851261b5c37445b3"; // your TMDb API key
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieSearch = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce query input to reduce API calls
  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: API_KEY,
              query: query,
            },
          }
        );
        setSearchResults(res.data.results.filter(m => m.poster_path)); // only with poster
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // wait 500ms after last keystroke

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelectMovie = (id) => {
    onClose();
    navigate(`/movies/${id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl hover:text-red-500"
        aria-label="Close search"
      >
        <FaTimes />
      </button>

      <div className="w-full max-w-2xl flex items-center bg-gray-800 rounded overflow-hidden mt-20">
        <FaSearch className="text-gray-400 mx-3" />
        <input
          type="text"
          placeholder="Search for movies..."
          className="w-full p-3 bg-transparent text-white outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {query && (
        <div className="w-full max-w-2xl mt-4 bg-gray-900 rounded overflow-hidden max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {loading ? (
            <p className="text-gray-400 p-3">Loading...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleSelectMovie(movie.id)}
                className="flex items-center gap-4 p-3 hover:bg-gray-700 cursor-pointer"
              >
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                  loading="lazy"
                  draggable={false}
                />
                <span className="text-white truncate">{movie.title}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 p-3">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
