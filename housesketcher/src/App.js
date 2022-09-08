import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NonLoginMainPage from './pages/NonLoginMainPage';
import LoginPage from './pages/LoginPage';
import AccountRegisterPage from './pages/AccountRegisterPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch className="App">
          <Route exact path="/">
            <NonLoginMainPage />
          </Route>          
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <AccountRegisterPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;