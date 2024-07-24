export const getAllDestinations = () => {
  return fetch(`http://localhost:8088/destinations`).then((res) => res.json());
};

export const addNewDestination = (newDestination) => {
  return fetch(`http://localhost:8088/destinations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDestination),
  }).then((res) => res.json());
};
