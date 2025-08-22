import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

const List = () => {
  const [list, setList] = useState([]);

  const normalizeMovie = (movie) => ({
    id: movie.id,
    title: movie.title || movie.name || movie.original_title || movie.original_name || "Untitled",
    poster_path: movie.poster_path || null,
    image: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : movie.backdrop_path
      ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
      : movie.image || FALLBACK_POSTER,
    overview: movie.overview || "",
    vote_average: movie.vote_average || null,
  });

  const loadList = () => {
    const savedList = JSON.parse(localStorage.getItem("myList")) || [];
    setList(savedList.map(normalizeMovie));
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleToggleList = (movie) => {
    const savedList = JSON.parse(localStorage.getItem("myList")) || [];
    const exists = savedList.find((m) => m.id === movie.id);

    let updatedList;
    if (exists) {
      updatedList = savedList.filter((m) => m.id !== movie.id);
    } else {
      updatedList = [...savedList, movie];
    }

    localStorage.setItem("myList", JSON.stringify(updatedList));
    setList(updatedList.map(normalizeMovie));
    // ✅ REMOVED the event dispatch to avoid conflicts with App.js
  };

  return (
    <div className="list-container p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">My List</h2>
      {list.length === 0 ? (
        <p className="text-gray-400">No movies in your list yet.</p>
      ) : (
        <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.image}
              overview={movie.overview}
              vote_average={movie.vote_average}
              isInList={true} // ✅ Changed to isInList (not isInMyList)
              onToggleList={() => handleToggleList(movie)} // ✅ Changed to onToggleList (not onAddToList)
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;