const apiUrl = "http://localhost:8088";

// Function to get all destinations and find the next available ID
const getNextId = async () => {
  const response = await fetch(`${apiUrl}/destinations`);
  const destinations = await response.json();
  if (destinations.length === 0) return 1; // Start with ID 1 if no destinations exist

  const highestId = Math.max(
    ...destinations.map((dest) => parseInt(dest.id, 10))
  );
  return highestId + 1;
};

export const getAllDestinations = async () => {
  const response = await fetch(`${apiUrl}/destinations`);
  return response.json();
};

export const getDestinationsByUserId = async (userId) => {
  const response = await fetch(`${apiUrl}/destinations?userId=${userId}`);
  return response.json();
};

export const addNewDestination = async (destination) => {
  const nextId = await getNextId(); // Get the next available ID
  const newDestination = { ...destination, id: nextId.toString() }; // Assign new ID

  const response = await fetch(`${apiUrl}/destinations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDestination),
  });
  return response.json();
};

export const deleteDestination = async (destinationId) => {
  const response = await fetch(`${apiUrl}/destinations/${destinationId}`, {
    method: "DELETE",
  });
  return response.json();
};

export const updateDestination = async (destination) => {
  const response = await fetch(`${apiUrl}/destinations/${destination.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destination),
  });
  return response.json();
};

export const getDestinationById = async (id) => {
  const response = await fetch(`${apiUrl}/destinations/${id}`);
  return response.json();
};
