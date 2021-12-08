import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import AccountList from "./components/AccountList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/Admin/Home";
import ScheduleFlight from "./pages/Admin/ScheduleFlight";
import RemoveFlights from "./pages/Admin/RemoveFlights";
import CustomerHome from "./pages/Customer/Home";
import ReserveProperty from "./pages/Customer/ReserveProperty";
import OwnerHome from "./pages/Owner/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/hello" component={AccountList} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin/home" component={AdminHome} />
        <Route exact path="/admin/schedule-flight" component={ScheduleFlight} />
        <Route exact path="/admin/remove-flight" component={RemoveFlights} />
        <Route exact path="/customer/home" component={CustomerHome} />
        <Route
          exact
          path="/customer/reserve-property"
          component={ReserveProperty}
        />
        <Route exact path="/owner/home" component={OwnerHome} />
      </Switch>
    </Router>
  );
}

export default App;
