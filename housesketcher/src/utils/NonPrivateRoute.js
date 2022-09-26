import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const NonPrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    console.log('NonPrivate', user);
    return (
        <Route {...rest}>
            {localStorage.getItem('authTokens') ? <Redirect to= "/loginmain" /> : children}
        </Route>
    )
}
export default NonPrivateRoute