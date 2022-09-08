import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NonLoginMainPage from './pages/NonLoginMainPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch className="App">
          <Route exact path="/">
            <NonLoginMainPage />
          </Route>
          <Route exact path="/searchpage">
            <SearchPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
