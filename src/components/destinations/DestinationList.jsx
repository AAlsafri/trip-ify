import { useEffect, useState } from "react";
import { getAllDestinations } from "../../services/destinationService";
import { addNewDestination } from "../../services/destinationService";
import { Destination } from "./Destination";
import { DestinationForm } from "./DestinationForm";
import "./Destinations.css";
import { DestinationFilterBar } from "./DestinationFilterBar";

export const DestinationList = () => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllDestinations().then((destinationsArray) => {
      setAllDestinations(destinationsArray);
    });
  }, []);

  useEffect(() => {
    let destinationsToFilter = allDestinations;

    if (showLiked) {
      destinationsToFilter = destinationsToFilter.filter(
        (destination) => destination.isLiked === true
      );
    }

    // Search all fields of the destination object
    const foundDestinations = destinationsToFilter.filter((destination) =>
      (destination.name + " " + destination.country + " " + destination.details)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredDestinations(foundDestinations);
  }, [searchTerm, showLiked, allDestinations]);

  const handleFormSubmit = (newDestination) => {
    addNewDestination(newDestination).then((addedDestination) => {
      setAllDestinations((prevDestinations) => [
        ...prevDestinations,
        addedDestination,
      ]);
    });
  };

  return (
    <div className="destinations-container">
      <h2>Destinations</h2>
      <DestinationFilterBar
        setShowLiked={setShowLiked}
        setSearchTerm={setSearchTerm}
      />
      <DestinationForm onFormSubmit={handleFormSubmit} />
      <article className="destinations">
        {filteredDestinations.map((destinationObj) => {
          return (
            <Destination destination={destinationObj} key={destinationObj.id} />
          );
        })}
      </article>
    </div>
  );
};
