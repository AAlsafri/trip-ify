export const getAllDestinations = () => {
  return fetch(`http://localhost:8088/destinations`).then((res) => res.json());
};
