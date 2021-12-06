import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AccountList from './components/AccountList';
import Login from './pages/Login';

function App() {
  const { Content } = Layout;
  return (
    <Content style={{ margin: '24px 24px 0px', paddingBottom: '0px', backgroundColor: 'white' }}>
      <AccountList></AccountList>
      <Login/>
   </Content>
  );
}

export default App;
