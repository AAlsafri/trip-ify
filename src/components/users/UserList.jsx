import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import "./Users.css";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((userArray) => {
      setUsers(userArray);
    });
  }, []);

  return (
    <div className="users">
      {users.map((userObj) => (
        <div key={userObj.id} className="user-card">
          <Link to={`/users/${userObj.id}`}>
            <div>Username: {userObj.name}</div>
            <div>Email: {userObj.email}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};
