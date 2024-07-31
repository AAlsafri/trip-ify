import React, { useState, useEffect } from "react";
import { getTravelHistoryByUserId } from "../../services/travelHistoryService";
import { useParams } from "react-router-dom";

export const Exploration = () => {
  const { userId } = useParams();
  const [travelHistory, setTravelHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      getTravelHistoryByUserId(userId).then((data) => {
        if (data.length > 0) {
          setTravelHistory(data[0].destination_ids);
        }
      });
    }
  }, [userId]);

  return (
    <div>
      <h2>Exploration</h2>
      {travelHistory.length > 0 ? (
        <ul>
          {travelHistory.map((destinationId) => (
            <li key={destinationId}>
              <Link to={`/destinations/${destinationId}`}>
                {" "}
                Destination #{destinationId}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No travel history available.</p>
      )}
    </div>
  );
};
