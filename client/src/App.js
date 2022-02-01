import { Route } from "react-router-dom";
import DetailCountry from "./components/Home/Country/DetailCountry";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import AddActivity from "./components/AddActivity/AddAcrivity";

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
      <Route exact path={"/addactivity"} component={AddActivity} />
    </div>
  );
}

export default App;
