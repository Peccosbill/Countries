import { Route } from "react-router-dom";
import DetailCountry from "./components/Home/Country/DetailCountry";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route
        exact
        path={"/country/:id"}
        render={({ match }) => <DetailCountry id={match.params.id} />}
      />
    </div>
  );
}

export default App;
