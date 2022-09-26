import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({children, ...rest}) => {    
    return (
        <Route {...rest}>
            {!localStorage.getItem('userInfo')  ? <Redirect to= "/" /> : children}
        </Route>
    )
}
export default PrivateRoute