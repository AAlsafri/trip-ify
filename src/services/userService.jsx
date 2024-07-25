export const getUsers = () => {
  return fetch(`http://localhost:8088/users`).then((res) => res.json());
};

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
    res.json()
  );
};

export const addUser = async (user) => {
  const response = await fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = (userId, updatedUser) => {
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  }).then((res) => res.json());
};

export const deleteUser = async (id) => {
  await fetch(`http://localhost:8088/users/${id}`, {
    method: "DELETE",
  });
};
