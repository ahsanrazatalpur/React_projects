import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_KEY = "ddafa23fa04bdad5851261b5c37445b3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const ytPlayerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,recommendations`
        );
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load movie details.");
        setLoading(false);
      }
    };
    fetchMovieDetail();

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (showPlayer) setShowPlayer(false);
        else navigate(-1);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [id, navigate, showPlayer]);

  if (loading) return <div className="text-white p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  // Find YouTube trailer
  const trailer = movie.videos?.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  if (!trailer) return <div className="text-white p-8">No trailer available</div>;

  const videoId = trailer.key;

  const scrollLeft = () => {
    const container = document.getElementById("recommended-scroll");
    if (container) container.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    const container = document.getElementById("recommended-scroll");
    if (container) container.scrollBy({ left: 200, behavior: "smooth" });
  };

  const startProgressTracking = () => {
    const stored = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    if (!stored.find((m) => m.id === movie.id)) {
      stored.unshift({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
      });
      localStorage.setItem("recentlyPlayed", JSON.stringify(stored));
      window.dispatchEvent(new Event("recentlyPlayedUpdated"));
    }

    const interval = setInterval(() => {
      if (window.YT && document.getElementById("youtube-player") && !ytPlayerRef.current) {
        ytPlayerRef.current = new window.YT.Player("youtube-player", {
          height: "100%",
          width: "100%",
          videoId,
          playerVars: { autoplay: 1, rel: 0 },
          events: {
            onReady: () => {
              progressIntervalRef.current = setInterval(() => {
                const player = ytPlayerRef.current;
                if (!player || player.getPlayerState() !== 1) return;
                const current = player.getCurrentTime();
                const duration = player.getDuration();
                const progressPercent = duration ? Math.min((current / duration) * 100, 100) : 0;

                const progressData = JSON.parse(localStorage.getItem("watchedProgress")) || {};
                progressData[id] = { progressPercent, duration, progress: current };
                localStorage.setItem("watchedProgress", JSON.stringify(progressData));
                window.dispatchEvent(new Event("watchedProgressUpdated"));
              }, 1000);
            },
          },
        });
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <>
      {/* Movie Details */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-start justify-center p-4">
        <div
          className="relative bg-gray-900 rounded-lg max-w-6xl w-full shadow-xl overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-md"
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path})`,
            }}
          ></div>

          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-red-600 z-30"
          >
            &times;
          </button>

          {/* Movie Info */}
          <div className="relative z-20 flex flex-col gap-8 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-2xl max-w-xs mx-auto md:mx-0"
              />
              <div className="flex-1 text-white max-w-3xl">
                <h1 className="text-5xl font-extrabold mb-2">{movie.title}</h1>
                <p className="text-red-600 font-semibold mb-4">{movie.tagline}</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full mb-6"
                  onClick={() => {
                    setShowPlayer(true);
                    startProgressTracking();
                  }}
                >
                  ▶ Play Trailer
                </button>
                <div className="mb-6 flex flex-wrap gap-3">
                  {movie.genres.map((g) => (
                    <span key={g.id} className="bg-red-600 px-3 py-1 rounded-full text-sm">
                      {g.name}
                    </span>
                  ))}
                </div>
                <p className="text-lg mb-6">{movie.overview}</p>
              </div>
            </div>

            {/* Recommended Movies */}
            {movie.recommendations?.results?.length > 0 && (
              <div className="px-2 pb-4 relative">
                <h2 className="text-white text-2xl font-semibold mb-4">More Like This</h2>
                <button
                  onClick={scrollLeft}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black p-2 rounded-full"
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </button>
                <button
                  onClick={scrollRight}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black p-2 rounded-full"
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </button>
                <div
                  id="recommended-scroll"
                  className="flex overflow-x-auto space-x-4 pb-4 scroll-pl-6 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
                >
                  {movie.recommendations.results.map((rec) => (
                    <img
                      key={rec.id}
                      src={`${IMAGE_BASE_URL}${rec.poster_path}`}
                      alt={rec.title}
                      className="w-24 sm:w-32 rounded-md cursor-pointer hover:scale-105 transform transition snap-start flex-shrink-0"
                      onClick={() => navigate(`/movies/${rec.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* YouTube Trailer */}
      {showPlayer && (
        <div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
          onClick={() => setShowPlayer(false)}
        >
          <div
            className="w-full h-full max-w-full max-h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div id="youtube-player" className="w-full h-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
