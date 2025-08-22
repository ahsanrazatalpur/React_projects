import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_KEY = "ddafa23fa04bdad5851261b5c37445b3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const heroTvShowId = 71446; // Money Heist TV show ID on TMDb

const HeroBanner = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!showInfo) return;

    const fetchShowDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${BASE_URL}/tv/${heroTvShowId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,recommendations`
        );
        setShow(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load show details.");
        setLoading(false);
      }
    };

    fetchShowDetail();

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowInfo(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showInfo]);

  const scrollLeft = () => {
    const container = document.getElementById("recommended-scroll");
    if (container) container.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById("recommended-scroll");
    if (container) container.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <>
      <header
        className="relative h-[60vh] md:h-[80vh] text-white"
        style={{
          backgroundImage: `url(/headerr.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <div className="absolute bottom-20 left-6 md:left-12 max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Money Heist</h1>
          <p className="text-sm md:text-lg mb-6 line-clamp-3">
            A criminal mastermind who goes by "The Professor" has a plan to pull
            off the biggest heist in recorded history — to print billions of
            euros in the Royal Mint of Spain.
          </p>
          <div className="flex space-x-3">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300">
              ▶ Play
            </button>
            <button
              className="bg-gray-600 bg-opacity-70 px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setShowInfo(true)}
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </header>

      {showInfo && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-90 flex items-start justify-center p-6"
          onClick={() => setShowInfo(false)}
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div
            className="relative bg-gray-900 rounded-lg max-w-6xl w-full shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-red-600 z-30"
              aria-label="Close show details"
            >
              &times;
            </button>

            {loading && (
              <div className="text-white text-center py-20 text-xl">Loading...</div>
            )}

            {error && (
              <div className="text-red-500 text-center py-20 text-xl">{error}</div>
            )}

            {show && !loading && !error && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 blur-md"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}${
                      show.backdrop_path || show.poster_path
                    })`,
                  }}
                ></div>

                <div className="relative z-20 flex flex-col md:flex-row gap-8 p-8">
                  <img
                    src={`${IMAGE_BASE_URL}${show.poster_path}`}
                    alt={show.name}
                    className="rounded-lg shadow-2xl max-w-xs mx-auto md:mx-0"
                  />

                  <div className="flex-1 text-white max-w-3xl">
                    <h1 className="text-5xl font-extrabold mb-2">{show.name}</h1>
                    <p className="text-red-600 font-semibold mb-4">{show.tagline}</p>

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full mb-6 transition-shadow shadow-lg"
                      onClick={() =>
                        window.open(
                          `https://www.youtube.com/watch?v=${
                            show.videos?.results.find(
                              (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                            )?.key
                          }`,
                          "_blank"
                        )
                      }
                      disabled={
                        !show.videos?.results.find(
                          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                        )
                      }
                      title={
                        show.videos?.results.find(
                          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                        )
                          ? "Play Trailer"
                          : "Trailer not available"
                      }
                    >
                      ▶ Play Trailer
                    </button>

                    <div className="mb-6 flex flex-wrap gap-3">
                      {show.genres.map((g) => (
                        <span
                          key={g.id}
                          className="bg-red-600 px-3 py-1 rounded-full text-sm"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>

                    <p className="text-lg mb-6">{show.overview}</p>

                    <div className="text-gray-300 space-y-1 text-sm">
                      <p>
                        <strong>First Air Date:</strong> {show.first_air_date}
                      </p>
                      <p>
                        <strong>Number of Seasons:</strong> {show.number_of_seasons}
                      </p>
                      <p>
                        <strong>Number of Episodes:</strong> {show.number_of_episodes}
                      </p>
                      <p>
                        <strong>Rating:</strong> {show.vote_average} / 10 (
                        {show.vote_count} votes)
                      </p>
                      <p>
                        <strong>Language:</strong> {show.original_language.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommended Shows (non-clickable) */}
                {show.recommendations?.results?.length > 0 && (
                  <div className="px-8 pb-8 relative">
                    <h2 className="text-white text-2xl font-semibold mb-4">
                      More Like This
                    </h2>

                    <button
                      aria-label="Scroll Left"
                      onClick={scrollLeft}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="text-white w-6 h-6" />
                    </button>

                    <button
                      aria-label="Scroll Right"
                      onClick={scrollRight}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="text-white w-6 h-6" />
                    </button>

                    <div
                      id="recommended-scroll"
                      className="flex overflow-x-auto space-x-4 pb-4 scroll-pl-6 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
                      style={{ scrollPaddingLeft: "1.5rem" }}
                    >
                      {show.recommendations.results
                        .slice(0, 10)
                        .map((rec) => (
                          <img
                            key={rec.id}
                            src={`${IMAGE_BASE_URL}${rec.poster_path}`}
                            alt={rec.name}
                            className="w-24 sm:w-32 rounded-md cursor-default snap-start flex-shrink-0"
                          />
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeroBanner;
