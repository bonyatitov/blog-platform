import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PrivatRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.auth );
  return (
    <Route 
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/authorization" />
        )
      }
    />
  )
}

export default PrivatRoute;