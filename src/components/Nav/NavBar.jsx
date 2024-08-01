import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/destinations">Destinations</Link>
      </li>
      <li className="navbar-item">
        <Link to="/explorations">Explorations</Link>
      </li>
      <li className="navbar-item">
        <Link to="/journey">My Journey</Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li>
      {localStorage.getItem("trip-ify_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("trip-ify_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
