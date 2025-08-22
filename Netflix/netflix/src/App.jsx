// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Outlet, useOutletContext } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import Genres from "./components/Genres";
import MovieDetail from "./components/MovieDetail";
import ContinueWatching from "./components/ContinueWatching";
import axios from "axios";

const API_KEY = "ddafa23fa04bdad5851261b5c37445b3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

// ---------------- Layout ----------------
function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem("watchlist")) || []);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => JSON.parse(localStorage.getItem("recentlyPlayed")) || []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const normalizeMovie = (movie) => ({
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_POSTER,
    poster_path: movie.poster_path || null,
    backdrop_path: movie.backdrop_path || null,
    overview: movie.overview || "",
    vote_average: movie.vote_average || null,
  });

  const toggleInWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, normalizeMovie(movie)];
    });
  };

  // ✅ Updated handlePlayVideo with real progress updates
  const handlePlayVideo = (movie) => {
    const progressData = JSON.parse(localStorage.getItem("videoProgress")) || {};

    // Simulate progress increment (10% per play click)
    let newProgress = (progressData[movie.id] || 0) + 10;
    if (newProgress > 100) newProgress = 100;

    progressData[movie.id] = newProgress;
    localStorage.setItem("videoProgress", JSON.stringify(progressData));

    // Update recently played list
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((m) => m.id !== movie.id);
      const updated = [normalizeMovie(movie), ...filtered].slice(0, 10);
      localStorage.setItem("recentlyPlayed", JSON.stringify(updated));
      return updated;
    });

    // 🔥 Notify ContinueWatching with correct event name
    window.dispatchEvent(new Event("recentlyPlayedUpdated"));
  };

  const onCategorySelect = (category) => {
    switch (category) {
      case "home": navigate("/"); break;
      case "movies": navigate("/movies"); break;
      case "tv-shows": navigate("/tv-shows"); break;
      case "new-popular": navigate("/new-popular"); break;
      case "my-list": navigate("/my-list"); break;
      default: navigate("/"); 
    }
  };

  return (
    <>
      <Navbar
        onCategorySelect={onCategorySelect}
        user={user}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
      <Outlet
        context={{
          watchlist,
          toggleInWatchlist,
          user,
          handleLogin,
          handleLogout,
          recentlyPlayed,
          handlePlayVideo,
        }}
      />
    </>
  );
}

// ---------------- Helper ----------------
const mapMoviesForRow = (movies, watchlist, toggleInWatchlist, onPlayVideo) =>
  movies.map((movie) => ({
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_POSTER,
    poster_path: movie.poster_path || null,
    backdrop_path: movie.backdrop_path || null,
    overview: movie.overview || "",
    vote_average: movie.vote_average || null,
    isInList: watchlist.some((m) => m.id === movie.id),
    onToggleList: () => toggleInWatchlist(movie),
    onPlayVideo: () => onPlayVideo(movie),
  }));

// ---------------- Home ----------------
function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const { watchlist, toggleInWatchlist, recentlyPlayed, handlePlayVideo } = useOutletContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingRes = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        setTrendingMovies(trendingRes.data.results.filter((m) => m.poster_path));

        const actionRes = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
        setActionMovies(actionRes.data.results.filter((m) => m.poster_path));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-16 px-4">
      <HeroBanner />
      <ContinueWatching recentlyPlayed={recentlyPlayed} onPlayVideo={handlePlayVideo} />
      <MovieRow
        title="Trending Now"
        movies={mapMoviesForRow(trendingMovies, watchlist, toggleInWatchlist, handlePlayVideo)}
      />
      <MovieRow
        title="Action Movies"
        movies={mapMoviesForRow(actionMovies, watchlist, toggleInWatchlist, handlePlayVideo)}
      />
      <Genres />
    </div>
  );
}

// ---------------- Movies ----------------
function Movies() {
  const [movies, setMovies] = useState([]);
  const { watchlist, toggleInWatchlist, handlePlayVideo } = useOutletContext();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setMovies(res.data.results.filter((m) => m.poster_path));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-16 px-4">
      <MovieRow
        title="Popular Movies"
        movies={mapMoviesForRow(movies, watchlist, toggleInWatchlist, handlePlayVideo)}
      />
    </div>
  );
}

// ---------------- TV Shows ----------------
function TvShows() {
  const [tvShows, setTvShows] = useState([]);
  const { watchlist, toggleInWatchlist, handlePlayVideo } = useOutletContext();

  useEffect(() => {
    const fetchPopularTv = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setTvShows(res.data.results.filter((t) => t.poster_path));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopularTv();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-16 px-4">
      <MovieRow
        title="Popular TV Shows"
        movies={mapMoviesForRow(tvShows, watchlist, toggleInWatchlist, handlePlayVideo)}
      />
    </div>
  );
}

// ---------------- New & Popular ----------------
function NewPopular() {
  const [items, setItems] = useState([]);
  const { watchlist, toggleInWatchlist, handlePlayVideo } = useOutletContext();

  useEffect(() => {
    const fetchTrendingAll = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
        setItems(res.data.results.filter((item) => item.poster_path));
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrendingAll();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-16 px-4">
      <MovieRow
        title="New & Popular"
        movies={mapMoviesForRow(items, watchlist, toggleInWatchlist, handlePlayVideo)}
      />
    </div>
  );
}

// ---------------- My List ----------------
function MyList() {
  const { watchlist, toggleInWatchlist } = useOutletContext();

  const myListMapped = watchlist.map((movie) => ({
    id: movie.id,
    title: movie.title || "Untitled",
    image: movie.image || FALLBACK_POSTER,
    poster_path: movie.poster_path || null,
    backdrop_path: movie.backdrop_path || null,
    overview: movie.overview || "",
    vote_average: movie.vote_average || null,
    isInList: true,
    onToggleList: () => toggleInWatchlist(movie),
  }));

  return (
    <div className="bg-black min-h-screen text-white pt-16 px-4">
      <h2 className="text-3xl font-bold mb-4">My List</h2>
      {watchlist.length === 0 ? (
        <p>You haven't added any movies to your list yet.</p>
      ) : (
        <MovieRow title="" movies={myListMapped} />
      )}
    </div>
  );
}

// ---------------- App ----------------
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv-shows" element={<TvShows />} />
        <Route path="new-popular" element={<NewPopular />} />
        <Route path="my-list" element={<MyList />} />
        <Route path="movies/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
