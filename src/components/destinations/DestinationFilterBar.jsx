export const DestinationFilterBar = ({ setShowLiked, setSearchTerm }) => {
  return (
    <div className="filter-bar">
      <button
        className="filter-btn btn-primary"
        onClick={() => {
          setShowLiked(true);
        }}
      >
        Liked Destinations
      </button>
      <button
        className="filter-btn btn-info"
        onClick={() => {
          setShowLiked(false);
        }}
      >
        Show All Destinations
      </button>
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Destinations"
        className="destination-search"
      />
    </div>
  );
};
