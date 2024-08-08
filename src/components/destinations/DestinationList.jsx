import { useEffect, useState } from "react";
import {
  getAllDestinations,
  deleteDestination,
} from "../../services/destinationService";
import { Destination } from "./Destination";
import { DestinationFilterBar } from "./DestinationFilterBar";
import { Link } from "react-router-dom";
import "./Destinations.css";

export const DestinationList = ({ currentUser }) => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch all destinations and set the state
  const fetchDestinations = () => {
    getAllDestinations()
      .then((destinationsArray) => {
        if (Array.isArray(destinationsArray)) {
          const userDestinations = destinationsArray.filter(
            (destination) => destination.user_id === currentUser.id
          );
          setAllDestinations(userDestinations);
        } else {
          console.error(
            "Unexpected response from getAllDestinations:",
            destinationsArray
          );
        }
      })
      .catch((error) => {
        console.error("Failed to fetch destinations:", error);
      });
  };

  useEffect(() => {
    fetchDestinations();
  }, [currentUser]);

  useEffect(() => {
    let destinationsToFilter = allDestinations;

    if (showLiked) {
      destinationsToFilter = destinationsToFilter.filter(
        (destination) => destination.isLiked === true
      );
    }

    const foundDestinations = destinationsToFilter.filter((destination) =>
      (destination.name + " " + destination.country + " " + destination.details)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredDestinations(foundDestinations);
  }, [searchTerm, showLiked, allDestinations]);

  // Handler to delete a destination and update the state
  const handleDelete = (id) => {
    deleteDestination(id)
      .then(() => {
        setAllDestinations((prevDestinations) =>
          prevDestinations.filter((destination) => destination.id !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete destination:", error);
      });
  };

  return (
    <div className="destinations-page">
      <div class="bottom-right-borders">
        <div className="destinations-header">
          <h2>Destinations</h2>
          <DestinationFilterBar
            setShowLiked={setShowLiked}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <div className="destinations-container">
        <article className="destinations">
          {filteredDestinations.map((destinationObj) => (
            <Destination
              key={destinationObj.id}
              destination={destinationObj}
              onDelete={handleDelete}
            />
          ))}
        </article>
      </div>
    </div>
  );
};
