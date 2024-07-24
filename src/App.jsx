import "./App.css";
import { DestinationList } from "./components/destinations/DestinationList";
import { UserList } from "./components/users/UserList";

export const App = () => {
  return (
    <>
      <DestinationList />
      <UserList />
    </>
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
