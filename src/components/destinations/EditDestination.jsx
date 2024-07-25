import React, { useState, useEffect } from "react";
import {
  getDestinationById,
  updateDestination,
} from "../../services/destinationService";
import { getAllContinents } from "../../services/continentService"; // Ensure this service exists or is replaced with hardcoded values
import "./Destinations.css";

export const EditDestination = ({ match, history }) => {
  const [destination, setDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent_id: "",
    details: "",
    isLiked: false,
  });
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const fetchDestination = async () => {
      const id = match.params.id;
      const dest = await getDestinationById(id);
      setDestination(dest);
    };

    const fetchContinents = async () => {
      const conts = await getAllContinents(); // Adjust if using hardcoded values
      setContinents(conts);
    };

    fetchDestination();
    fetchContinents();
  }, [match.params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDestination({ ...destination, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDestination(destination.id, destination);
    history.push("/destinations"); // Redirect to the destinations list or details page
  };

  return (
    <div className="destination-form">
      <form onSubmit={handleSubmit} className="destination-form-wrapper">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={destination.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={destination.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={destination.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="continent">Continent:</label>
          <select
            id="continent_id"
            name="continent_id"
            value={destination.continent_id}
            onChange={handleChange}
          >
            <option value="">Select Continent</option>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={destination.details}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isLiked">Liked:</label>
          <input
            type="checkbox"
            id="isLiked"
            name="isLiked"
            checked={destination.isLiked}
            onChange={() =>
              setDestination({
                ...destination,
                isLiked: !destination.isLiked,
              })
            }
          />
        </div>
        <button type="submit">Update Destination</button>
      </form>
    </div>
  );
};
