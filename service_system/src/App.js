import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/hello" element={<AccountList />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin/home" element={<AdminHome />} />
        <Route
          exact
          path="/admin/schedule-flight"
          element={<ScheduleFlight />}
        />
        <Route exact path="/admin/remove-flight" element={<RemoveFlights />} />
      </Routes>
    </Router>
  );
}

export default App;
