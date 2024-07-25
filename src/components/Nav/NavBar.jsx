import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/destinations">Destinations</Link>
      </li>
      <li className="navbar-item">
        <Link to="/users">Users</Link>
      </li>
    </ul>
  );
};
