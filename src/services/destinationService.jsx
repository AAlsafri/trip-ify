export const getAllDestinations = async () => {
  const response = await fetch("http://localhost:8088/destinations");
  return response.json();
};

export const addNewDestination = async (destination) => {
  const response = await fetch("http://localhost:8088/destinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination),
  });
  return response.json();
};

export const deleteDestination = async (id) => {
  await fetch(`http://localhost:8088/destinations/${id}`, {
    method: "DELETE",
  });
};

export const getDestinationById = async (id) => {
  const response = await fetch(`http://localhost:8088/destinations/${id}`);
  return response.json();
};

export const updateDestination = async (id, updatedDestination) => {
  const response = await fetch(`http://localhost:8088/destinations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDestination),
  });
  return response.json();
};
