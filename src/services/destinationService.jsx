export const getAllDestinations = async () => {
  const response = await fetch("http://localhost:8088/destinations");
  return response.json();
};

// Function to generate sequential numeric IDs
const generateSequentialId = async () => {
  const response = await fetch("http://localhost:8088/destinations");
  const destinations = await response.json();

  // Extract numeric IDs and handle cases where there are no destinations
  const ids = destinations
    .map((dest) => parseInt(dest.id, 10))
    .filter((id) => !isNaN(id));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return maxId + 1;
};

// Function to add a new destination with a string ID
export const addNewDestination = async (destination) => {
  // Generate sequential numeric ID
  const nextId = await generateSequentialId();

  // Ensure ID is a string
  const destinationWithId = {
    ...destination,
    id: nextId.toString(), // FIX: Convert ID to a string
  };

  const response = await fetch("http://localhost:8088/destinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(destinationWithId),
  });
  return response.json();
};

// Function to delete a destination by ID
export const deleteDestination = async (id) => {
  await fetch(`http://localhost:8088/destinations/${id}`, {
    method: "DELETE",
  });
};

// Function to fetch a destination by ID
export const getDestinationById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8088/destinations/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch destination");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch destination:", error);
    throw error;
  }
};

// Function to update a destination by ID
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
