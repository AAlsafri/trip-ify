import React from "react";

export const Destination = ({ destination, onDelete, onEditClick }) => {
  const handleDelete = () => {
    onDelete(destination.id);
  };

  return (
    <section className="destination">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 onClick={onEditClick} style={{ margin: 0, cursor: "pointer" }}>
          #{destination.id} {destination.name}
        </h3>
        <p style={{ margin: "0 auto", fontSize: "0.9rem", color: "#555" }}>
          Visited on: {destination.visitedDate} {destination.daysAgo}
        </p>
        {destination.isLiked && (
          <span className="heart-emoji" role="img" aria-label="heart">
            ❤️
          </span>
        )}
      </header>
      <div>{destination.details}</div>
      <footer>
        <button onClick={handleDelete} className="button">
          Delete
        </button>
      </footer>
    </section>
  );
};
