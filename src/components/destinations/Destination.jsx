import { Link } from "react-router-dom";

export const Destination = ({ destination, onDelete }) => {
  const handleDelete = () => {
    onDelete(destination.id);
  };

  return (
    <section className="destination">
      <header>
        <Link to={`/destinations/${destination.id}`}>
          <h3>
            #{destination.id} {destination.name}
          </h3>
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
          {/* <button>Edit</button> */}
        </Link>
      </footer>
    </section>
  );
};
