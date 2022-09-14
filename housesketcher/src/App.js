import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NonLoginMainPage from './pages/NonLoginMainPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import AccountRegisterPage from './pages/AccountRegisterPage'
import { AuthProvider } from './context/AuthContext'
import LoginMainPage from './pages/LoginMainPage'


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* AuthProvider를 통해 안에 있는 페이지안에서 유저정보를 사용가능하다. 
            import React, {useContext} from 'react'
            import AuthContext from '../context/AuthContext'(위치)
            함수 안 let {authTokens} = useContext(AuthContext) => token 가져오기 authTokens.access 
                    let {userInfo} = useContext(AuthContext) => 현재 유저정보 가져오기 
          */}
          <Switch className="App">
            <Route exact path= "/loginmain">
              <LoginMainPage />
            </Route>
            <Route exact path="/">
              <NonLoginMainPage />
            </Route>
            <Route exact path="/searchpage">
              <SearchPage />
            </Route>          
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <AccountRegisterPage />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
