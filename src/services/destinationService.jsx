const apiUrl = "http://localhost:8088";

// Function to get all destinations and find the next available ID
const getNextId = async () => {
  try {
    const response = await fetch(`${apiUrl}/destinations`);
    if (!response.ok) throw new Error("Failed to fetch destinations");
    const destinations = await response.json();
    if (destinations.length === 0) return 1; // Start with ID 1 if no destinations exist

    const highestId = Math.max(
      ...destinations.map((dest) => parseInt(dest.id, 10))
    );
    return highestId + 1;
  } catch (error) {
    console.error("Error fetching destinations for ID calculation:", error);
    throw error;
  }
};

export const getAllDestinations = async () => {
  try {
    const response = await fetch(`${apiUrl}/destinations`);
    if (!response.ok) throw new Error("Failed to fetch all destinations");
    return response.json();
  } catch (error) {
    console.error("Error fetching all destinations:", error);
    throw error;
  }
};

export const getDestinationsByUserId = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/destinations?userId=${userId}`);
    if (!response.ok)
      throw new Error("Failed to fetch destinations by user ID");
    return response.json();
  } catch (error) {
    console.error("Error fetching destinations by user ID:", error);
    throw error;
  }
};

export const addNewDestination = async (destination) => {
  try {
    const nextId = await getNextId(); // Get the next available ID
    const newDestination = { ...destination, id: nextId.toString() }; // Assign new ID

    const response = await fetch(`${apiUrl}/destinations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDestination),
    });
    if (!response.ok) throw new Error("Failed to add new destination");
    return response.json();
  } catch (error) {
    console.error("Error adding new destination:", error);
    throw error;
  }
};

export const deleteDestination = async (destinationId) => {
  const response = await fetch(`${apiUrl}/destinations/${destinationId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete destination: ${response.statusText}`);
  }
  return; // No need to return JSON, just return undefined
};

export const updateDestination = async (id, destination) => {
  try {
    const response = await fetch(`${apiUrl}/destinations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destination),
    });
    if (!response.ok) throw new Error("Failed to update destination");
    return response.json();
  } catch (error) {
    console.error("Error updating destination:", error);
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/destinations/${id}`);
    if (!response.ok) throw new Error("Failed to fetch destination by ID");
    return response.json();
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    throw error;
  }
};
