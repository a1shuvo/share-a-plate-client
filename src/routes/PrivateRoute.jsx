import { Navigate, useLocation } from "react-router";
import Loader from "../components/shared/Loader";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
