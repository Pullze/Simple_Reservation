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
import BookFlight from "./pages/Customer/BookFlight";
import CancelFlight from "./pages/Customer/CancelFlight";
import ReserveProperty from "./pages/Customer/ReserveProperty";
import CancelProperty from "./pages/Customer/CancelProperty";
import ReviewProperty from "./pages/Customer/ReviewProperty";
import CustomerRateOwner from "./pages/Customer/RateOwner";
import OwnerHome from "./pages/Owner/Home";
import ViewOwners from "./pages/Admin/ViewOwners";
import ViewCustomers from "./pages/Admin/ViewCustomers";
import ViewAirports from "./pages/Admin/ViewAirport";
import ProcessDate from "./pages/Admin/ProcessDate";
import ViewAirlines from "./pages/Admin/ViewAirlines";
import ViewFlights from "./pages/Admin/ViewFlight";

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
        <Route exact path="/admin/view-owner" component={ViewOwners}/>
        <Route exact path="/admin/view-customer" component={ViewCustomers}/>
        <Route exact path="/admin/view-airport" component={ViewAirports}/>
        <Route exact path="/admin/view-airline" component={ViewAirlines}/>
        <Route exact path="/admin/view-flight" component={ViewFlights}/>
        <Route exact path="/admin/process-date" component={ProcessDate}/>
        <Route exact path="/customer/home" component={CustomerHome} />
        <Route exact path="/customer/book-flight" component={BookFlight} />
        <Route exact path="/customer/cancel-flight" component={CancelFlight} />
        <Route
          exact
          path="/customer/reserve-property"
          component={ReserveProperty}
        />
        <Route
          exact
          path="/customer/cancel-reservation"
          component={CancelProperty}
        />
        <Route
          exact
          path="/customer/review-property"
          component={ReviewProperty}
        />
        <Route
          exact
          path="/customer/rate-owner"
          component={CustomerRateOwner}
        />
        <Route exact path="/owner/home" component={OwnerHome} />
      </Switch>
    </Router>
  );
}

export default App;
