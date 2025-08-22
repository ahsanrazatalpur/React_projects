import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit, movieId }) => {
  const storageKey = `movie-${movieId}-draft`; // temporary draft per movie
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Load draft from localStorage
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem(storageKey));
    if (draft) {
      setRating(draft.rating || 0);
      setReviewText(draft.reviewText || "");
    }
  }, [storageKey]);

  // Save draft on change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ rating, reviewText }));
  }, [rating, reviewText, storageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5 stars");
      return;
    }
    if (reviewText.trim() === "") {
      alert("Please write a review");
      return;
    }

    const newReview = {
      rating,
      reviewText: reviewText.trim(),
      date: new Date().toISOString(), // optional timestamp
    };

    onSubmit(newReview);

    // Reset form
    setRating(0);
    setReviewText("");
    localStorage.removeItem(storageKey);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <StarRating
        rating={rating}
        onRatingChange={setRating}
        storageKey={`${storageKey}-star`}
      />
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
        rows={3}
        style={{ resize: "none", padding: "8px", borderRadius: "4px" }}
      />
      <button
        type="submit"
        style={{
          padding: "8px",
          background: "#E50914",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
