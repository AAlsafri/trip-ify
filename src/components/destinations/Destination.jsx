import { Link } from "react-router-dom";
import { deleteDestination } from "../../services/destinationService";

export const Destination = ({ destination, onDelete }) => {
  const handleDelete = () => {
    deleteDestination(destination.id)
      .then(() => {
        if (typeof onDelete === "function") {
          onDelete(destination.id);
        } else {
          console.error("onDelete is not a function");
        }
      })
      .catch((error) => {
        console.error("Failed to delete destination:", error);
      });
  };

  return (
    <section className="destination">
      <header>
        <Link to={`/destinations/${destination.id}`}>
          <h3>{destination.name}</h3>
        </Link>
      </header>
      <div>{destination.details}</div>
      <footer>
        <div>
          <div>Is this a favorite destination?</div>
          <div>{destination.isLiked ? "Yes!" : "No."}</div>
        </div>
        <button onClick={handleDelete}>Delete</button>
        <Link to={`/destinations/${destination.id}/edit`}>
          <button>Edit</button>
        </Link>
      </footer>
    </section>
  );
};
