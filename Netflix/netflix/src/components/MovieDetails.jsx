import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = "YOUR_TMDB_API_KEY"; // put your API key here

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-white p-8">Movie not found.</div>;
  }

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
      >
        Go Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-gray-300">{movie.overview}</p>
          <p className="mt-4">Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average} / 10</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
