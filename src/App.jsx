import { useEffect, useState } from "react";
import { getAllDestinations } from "./services/destinationService";
import "./App.css";

export const App = () => {
  const [allDestinations, setAllDestinations] = useState([]);

  useEffect(() => {
    getAllDestinations().then((destinationsArray) => {
      setAllDestinations(destinationsArray);
      console.log("destinations set!");
    });
  }, []);

  return (
    <div className="destinations-container">
      <h2>Destinations</h2>
      <article className="destinations">
        {allDestinations.map((destination) => {
          return (
            <section className="destinations">
              <header className="destinations-container">
                #{destination.id}
              </header>
              <div>{destination.details}</div>
              <footer>
                <div>
                  <div className="destinations-container">Liked?</div>
                  <div>{destination.isLiked ? "Yes!" : "No."}</div>
                </div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
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
