import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDestinationById,
  updateDestination,
} from "../../services/destinationService";

export const DestinationDetails = () => {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDestinationById(destinationId)
      .then((data) => setDestination(data))
      .catch((error) => console.error("Failed to fetch destination:", error));
  }, [destinationId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateDestination(destinationId, destination);
      setIsEditMode(false);
      navigate(`/destinations/${destinationId}`);
    } catch (error) {
      console.error("Failed to update destination:", error);
    }
  };

  if (!destination) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Destination Details</h2>
      {isEditMode ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Destination Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={destination.name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={destination.country || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State (optional):</label>
            <input
              type="text"
              id="state"
              name="state"
              value={destination.state || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="continent_id">Continent:</label>
            <select
              id="continent_id"
              name="continent_id"
              value={destination.continent_id || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a continent</option>
              <option value="1">North America</option>
              <option value="2">Europe</option>
              <option value="3">Asia</option>
              <option value="4">Africa</option>
              <option value="5">Australia</option>
              <option value="6">South America</option>
              <option value="7">Antarctica</option>
            </select>
          </div>
          <div>
            <label htmlFor="details">Details:</label>
            <textarea
              id="details"
              name="details"
              value={destination.details || ""}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="isLiked">Liked:</label>
            <input
              type="checkbox"
              id="isLiked"
              name="isLiked"
              checked={destination.isLiked || false}
              onChange={() =>
                setDestination((prev) => ({
                  ...prev,
                  isLiked: !prev.isLiked,
                }))
              }
            />
          </div>
          <button type="submit">Update Destination</button>
        </form>
      ) : (
        <div>
          <h3>{destination.name}</h3>
          <p>{destination.details}</p>
          <p>Country: {destination.country}</p>
          <p>State: {destination.state}</p>
          <p>Continent: {destination.continent_id}</p>
          <p>Favorite: {destination.isLiked ? "Yes" : "No"}</p>
          <button onClick={() => setIsEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};
