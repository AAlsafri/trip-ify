import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import "./Users.css";
import { User } from "./User";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((userArray) => {
      setUsers(userArray);
    });
  }, []);

  return (
    <div className="users">
      {users.map((userObj) => {
        return <User user={userObj} key={userObj.id} />;
      })}
    </div>
  );
};
