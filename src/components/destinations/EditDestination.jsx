import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDestinationById,
  updateDestination,
} from "../../services/destinationService";
import { getAllContinents } from "../../services/continentService"; // Ensure this service exists or is replaced with hardcoded values
import "./Destinations.css";

export const EditDestination = () => {
  const { id } = useParams(); // Use useParams to get the ID from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [destination, setDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent_id: "",
    details: "",
    isLiked: false,
    id: "", // Ensure id is part of the destination object
  });
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const fetchDestination = async () => {
      const dest = await getDestinationById(id);
      if (dest) {
        setDestination(dest);
      }
    };

    const fetchContinents = async () => {
      const conts = await getAllContinents(); // Adjust if using hardcoded values
      setContinents(conts);
    };

    fetchDestination();
    fetchContinents();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setDestination((prevDestination) => ({
      ...prevDestination,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!destination.id) {
      console.error("Destination ID is missing");
      return;
    }
    try {
      await updateDestination(destination); // Ensure destination object includes the id
      navigate("/destinations", { replace: true });
      // Redirect to the destinations list
    } catch (error) {
      console.error("Failed to update destination:", error);
    }
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
          <label htmlFor="continent_id">Continent:</label>
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
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Destination</button>
      </form>
    </div>
  );
};
// Auto Nav to /destination right as you click btn for submit
