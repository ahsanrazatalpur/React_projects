// src/components/MoviesList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = "YOUR_API_KEY"; // Replace with your TMDb API key
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex overflow-x-auto gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
        />
      ))}
    </div>
  );
};

export default MoviesList;
