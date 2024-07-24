export const Destination = ({ destination }) => {
  return (
    <section className="destination">
      <header className="destination-container">
        #{destination.id}
        <h3>{destination.name}</h3>
      </header>
      <div>{destination.details}</div>
      <footer>
        <div>
          <div className="destinations-container">Liked?</div>
          <div>{destination.isLiked ? "Yes!" : "No."}</div>
        </div>
      </footer>
    </section>
  );
};
