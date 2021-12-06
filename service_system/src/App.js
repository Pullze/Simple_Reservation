import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AccountList from './components/AccountList';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { Content } = Layout;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/hello" element={<AccountList/>}/>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
