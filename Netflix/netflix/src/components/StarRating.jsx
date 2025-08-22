import React, { useState, useEffect } from "react";

const StarRating = ({ rating, onRatingChange, storageKey }) => {
  const [hover, setHover] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  // Load rating from localStorage if storageKey is provided
  useEffect(() => {
    if (storageKey) {
      const savedRating = localStorage.getItem(storageKey);
      if (savedRating) setCurrentRating(Number(savedRating));
    }
  }, [storageKey]);

  const handleRatingChange = (value) => {
    setCurrentRating(value);
    onRatingChange(value);
    if (storageKey) localStorage.setItem(storageKey, value);
  };

  return (
    <div style={{ display: "flex", gap: "4px", fontSize: "24px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{ color: star <= (hover || currentRating) ? "#FFD700" : "#555" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
