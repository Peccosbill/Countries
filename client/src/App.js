import { Route } from "react-router-dom";
import DetailCountry from "./components/Home/Country/DetailCountry";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav"
import AddActivity from "./components/AddActivity/AddActivity";
import Error404 from "./components/Error/Error404";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Nav} />
      <Route exact path="/home" component={Home} />
      <Route
        exact
        path={"/home/country/:id"}
        render={({ match }) => <DetailCountry id={match.params.id} />}
      />
      <Route exact path={"/home/addactivity"} component={AddActivity} />
      <Route path="*" component={Error404} />
    </div>
  );
}

export default App;
