import { Link, useNavigate } from "react-router-dom";
import "/src/index.css";
import { useState } from "react";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/destinations">Destinations</Link>
          </li>
          <li>
            <Link to="/explorations">Explorations</Link>
          </li>
          <li>
            <Link to="/journey">My Journey</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {localStorage.getItem("trip-ify_user") && (
            <li>
              <Link
                to=""
                onClick={() => {
                  localStorage.removeItem("trip-ify_user");
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
        <div className="menu-button" onClick={toggleSidebar}>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </a>
        </div>
      </div>
      <ul className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/explorations">Explorations</Link>
        </li>
        <li>
          <Link to="/journey">My Journey</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {localStorage.getItem("trip-ify_user") && (
          <li>
            <Link
              to=""
              onClick={() => {
                localStorage.removeItem("trip-ify_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};
