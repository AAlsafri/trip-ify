import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDestinationById,
  updateDestination,
} from "../../services/destinationService";
import { DestinationForm } from "./DestinationForm";

export const EditDestination = () => {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDestinationById(destinationId).then(setDestination);
  }, [destinationId]);

  const handleUpdate = (updatedDestination) => {
    updateDestination(destinationId, updatedDestination).then(() => {
      navigate("/destinations");
    });
  };

  return (
    <div>
      <h2>Edit Destination</h2>
      {destination ? (
        <DestinationForm
          onFormSubmit={handleUpdate}
          initialData={destination}
          submitButtonText="Update Destination"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
