import "./Welcome.css";

export const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>
        <span>Welcome to</span>
        <span>[trip-ify] Global Explorer App</span>
      </h1>
      <div>
        The best application for recording and tracking your visited
        destinations and sharing them with others!
      </div>
      <p>**Please checkout the navigation bar at the top for direction</p>
    </div>
  );
};
