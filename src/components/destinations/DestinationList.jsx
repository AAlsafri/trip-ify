import { useEffect, useRef, useState } from "react";
import {
  getAllDestinations,
  deleteDestination,
} from "../../services/destinationService";
import { Destination } from "./Destination";
import { DestinationFilterBar } from "./DestinationFilterBar";
import "./Destinations.css";

export const DestinationList = ({ currentUser }) => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const headerRef = useRef(null); // Reference to the header
  const containerRef = useRef(null); // Reference to the container

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

  // Trigger animation on load
  useEffect(() => {
    const header = document.querySelector(".destinations-header");
    const bottomRightBorders = document.querySelector(".bottom-right-borders");
    const destinations = document.querySelector(".destinations");

    // Trigger the animation after a brief delay
    setTimeout(() => {
      header.style.animation = "splitBorders 1s forwards";
      bottomRightBorders.style.animation = "moveBottomRight 1s forwards";

      // Show the destination cards after the animation
      setTimeout(() => {
        destinations.style.opacity = 1;
      }, 1000); // Delay to match the animation duration
    }, 500); // Delay before starting the animation
  }, []);

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
      <div className="bottom-right-borders">
        <div ref={headerRef} className="destinations-header">
          <h2>Destinations</h2>
          <DestinationFilterBar
            setShowLiked={setShowLiked}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <div ref={containerRef} className="destinations-container">
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
