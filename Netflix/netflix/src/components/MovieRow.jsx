import React, { useRef, useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieRow = ({ title, movies = [] }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // ✅ Stable scroll check
  const checkScroll = useCallback(() => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = rowRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, movies]);

  const scroll = (direction) => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className="relative my-6">
      {title && (
        <h2 className="text-white text-2xl font-semibold mb-3 select-none px-4">{title}</h2>
      )}

      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black p-3 rounded-full shadow-lg transition-opacity"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
      )}

      {/* Movie cards */}
      <div
        ref={rowRef}
        className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-4 scroll-smooth py-2 relative"
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name || movie.original_title || movie.original_name || "Untitled"}
              poster_path={movie.poster_path || null}
              backdrop_path={movie.backdrop_path || null}
              image={movie.image || null}
              overview={movie.overview || ""}
              vote_average={movie.vote_average || 0}
              videoSrc={movie.videoSrc || null}
              isInList={movie.isInList || false}         // ✅ fixed
              onToggleList={movie.onToggleList || null}  // ✅ fixed
            />
          ))
        ) : (
          <p className="text-white px-4">No movies to display.</p>
        )}
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black p-3 rounded-full shadow-lg transition-opacity"
          aria-label="Scroll Right"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default MovieRow;
