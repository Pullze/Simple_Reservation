import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import AccountList from "./components/AccountList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/Admin/Home";
import ScheduleFlight from "./pages/Admin/ScheduleFlight";
import RemoveFlights from "./pages/Admin/RemoveFlights";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/hello" component={AccountList} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin/home" component={AdminHome } />
        <Route
          exact
          path="/admin/schedule-flight"
          component={ScheduleFlight}
        />
        <Route exact path="/admin/remove-flight" component={RemoveFlights} />
      </Switch>
    </Router>
  );
}

export default App;
