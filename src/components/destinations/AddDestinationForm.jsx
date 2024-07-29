import React, { useState } from "react";
import { addNewDestination } from "../../services/destinationService";
import "./Destinations.css";
import { useNavigate } from "react-router-dom";

export const AddDestinationPage = ({ currentUser }) => {
  const [newDestination, setNewDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent: "",
    details: "",
    isLiked: false,
    user_id: currentUser ? currentUser.id : null, // Handle undefined case
  });

  const navigate = useNavigate();

  const continents = [
    { id: "1", name: "North America" },
    { id: "2", name: "Europe" },
    { id: "3", name: "Asia" },
    { id: "4", name: "Africa" },
    { id: "5", name: "Australia" },
    { id: "6", name: "South America" },
    { id: "7", name: "Antarctica" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDestination({ ...newDestination, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert("User not logged in");
      return;
    }
    // Ensure user_id is set correctly
    if (!newDestination.user_id) {
      newDestination.user_id = currentUser.id;
    }
    await addNewDestination(newDestination);
    setNewDestination({
      name: "",
      country: "",
      state: "",
      continent: "",
      details: "",
      isLiked: false,
      user_id: currentUser.id,
    });
    navigate("/destinations");
  };

  if (!currentUser) {
    return <div>Please log in to add a new destination.</div>;
  }

  return (
    <div className="destination-form-wrapper">
      <h2>Add New Destination</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newDestination.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={newDestination.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={newDestination.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="continent">Continent:</label>
          <select
            id="continent"
            name="continent"
            value={newDestination.continent}
            onChange={handleChange}
          >
            <option value="">Select Continent</option>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.name}>
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
            value={newDestination.details}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isLiked">Liked:</label>
          <input
            type="checkbox"
            id="isLiked"
            name="isLiked"
            checked={newDestination.isLiked}
            onChange={() =>
              setNewDestination({
                ...newDestination,
                isLiked: !newDestination.isLiked,
              })
            }
          />
        </div>
        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
};
