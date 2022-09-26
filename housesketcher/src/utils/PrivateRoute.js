import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return (
        <Route {...rest}>
            {!localStorage.getItem('authTokens')  ? <Redirect to= "/" /> : children}
        </Route>
    )
}
export default PrivateRoute