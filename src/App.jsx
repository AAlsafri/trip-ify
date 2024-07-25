import { Routes, Route, Outlet } from "react-router-dom";
import { DestinationList } from "./components/destinations/DestinationList";
import { NavBar } from "./components/Nav/NavBar";
import { UserList } from "./components/users/UserList";
import "./App.css";
import { Welcome } from "./components/welcome/Welcome";
import { UserDetails } from "./components/users/UserDetails";
import { DestinationDetails } from "./components/destinations/DestinationDetails";
import { AddDestinationPage } from "./components/destinations/AddDestinationForm";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="destinations">
          <Route index element={<DestinationList />} />
          <Route path="add" element={<AddDestinationPage />} />
          <Route path=":destinationId" element={<DestinationDetails />} />
        </Route>
        <Route path="users">
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserDetails />} />
        </Route>
      </Route>
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
