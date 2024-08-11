import { Link } from "react-router-dom";

export const Destination = ({ destination, onDelete }) => {
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
        <Link to={`/destinations/${destination.id}`}>
          <h3 style={{ margin: 0 }}>
            #{destination.id} {destination.name}
          </h3>
        </Link>
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
        <Link to={`/destinations/${destination.id}/edit`}>
          {/* <button>Edit</button> */}
        </Link>
      </footer>
    </section>
  );
};
