import { useState, useEffect } from "react";
import { DestinationForm } from "./DestinationForm";
import { useNavigate } from "react-router-dom";
import {
  addNewDestination,
  getAllDestinations,
} from "../../services/destinationService";

export const AddDestinationPage = () => {
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDestinations().then((destinations) => {
      const ids = destinations.map((dest) => parseInt(dest.id, 10));
      setNextId(Math.max(...ids) + 1);
    });
  }, []);

  const handleFormSubmit = (newDestination) => {
    const destinationWithId = { ...newDestination, id: nextId };
    addNewDestination(destinationWithId).then(() => {
      navigate("/destinations");
    });
  };

  return (
    <div className="add-destination-page">
      <h2>Add New Destination</h2>
      <DestinationForm onFormSubmit={handleFormSubmit} />
    </div>
  );
};
