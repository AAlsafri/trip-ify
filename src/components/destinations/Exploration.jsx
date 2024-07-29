import React, { useState, useEffect } from "react";
import { getTravelHistoryByUserId } from "../../services/travelHistoryService";
import { useParams } from "react-router-dom";

export const Exploration = () => {
  const { userId } = useParams();
  const [travelHistory, setTravelHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      getTravelHistoryByUserId(userId).then(setTravelHistory);
    }
  }, [userId]);

  return (
    <div>
      <h2>Exploration</h2>
      {travelHistory.length > 0 ? (
        <ul>
          {travelHistory.map((destination) => (
            <li key={destination.id}>
              {destination.name} ({destination.country})
            </li>
          ))}
        </ul>
      ) : (
        <p>No travel history available.</p>
      )}
    </div>
  );
};
