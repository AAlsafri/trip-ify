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

  useEffect(() => {
    getAllDestinations()
      .then((destinationsArray) => {
        // Ensure destinationsArray is an array and filter by currentUser.id
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
  }, [currentUser]); // Fetch destinations when currentUser changes

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

  const handleDelete = (id) => {
    deleteDestination(id)
      .then(() => {
        setAllDestinations(
          allDestinations.filter((destination) => destination.id !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete destination:", error);
      });
  };

  return (
    <div className="destinations-container">
      <h2>Destinations</h2>
      <DestinationFilterBar
        setShowLiked={setShowLiked}
        setSearchTerm={setSearchTerm}
      />
      <Link to="/destinations/add" className="add-destination-button">
        Add Destination
      </Link>
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
  );
};
