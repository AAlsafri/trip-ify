import { useState } from "react";

export const DestinationForm = ({ onFormSubmit }) => {
  const [newDestination, setNewDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent_id: "",
    details: "",
    isLiked: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewDestination((prevDestination) => ({
      ...prevDestination,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(newDestination);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Destination Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newDestination.name}
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
          value={newDestination.country}
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
          value={newDestination.state}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="continent_id">Continent:</label>
        <select
          id="continent_id"
          name="continent_id"
          value={newDestination.continent_id}
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
          value={newDestination.details}
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
          checked={newDestination.isLiked}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Destination</button>
    </form>
  );
};
