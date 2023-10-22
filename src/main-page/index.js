import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./main-page.css";
import Header from "./header";
import FeaturedHouse from "./featured-house";

function App() {
  // uses steate to be able to access the value of allHouses (that is fetched inside useEffect)
  const [allHouses, setAllHouses] = useState([]);

  // ensures that the data loading is only executed one time in this case (on the first render)
  // bc the array passed as the second parameter is empty.
  // this array determines which elements cause this code to re-render.
  useEffect(() => {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  // useMemo makes this data to be stored as a "cache" of sorts
  // in this case, this ensures that the featuredHouse does not change
  // on each re-render.
  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);

  return (
    <Router>
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <Switch>
          <Route path="/">
            <FeaturedHouse house={featuredHouse} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
