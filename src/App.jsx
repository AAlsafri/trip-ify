import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import UserExplorations from "./components/users/UserExplorations";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
      <Route path="/explorations" element={<UserExplorations />} /> {/* NEW */}
    </Routes>
  );
};

export default App;

// <h1>Trip-ify</h1>
// <div>First renders of my global exploration App!</div>
// <div>
//   <p></p>
//   <button onClick={handleBtnClick}>Trip here!</button>
//   <p></p>
//   <div>Count : {count}</div>
// </div>
// <div>
//   <p></p>
//   <input type="text" placeholder="Choose a destination" />
// </div>
