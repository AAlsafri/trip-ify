import "./Users.css";

export const User = ({ user }) => {
  return (
    <div className="user-card">
      <div>
        <div className="user-info">Username :</div>
        <div>{user.name}</div>
      </div>
      <div>
        <div className="user-info">Email :</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
};
