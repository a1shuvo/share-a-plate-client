import { Navigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import Loader from "../components/shared/Loader";
import { useAuth } from "../hooks/useAuth";
import { useUserRole } from "../hooks/useUserRole";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Loader></Loader>;
  }

  if (!user || !allowedRoles.includes(role)) {
    Swal.fire({
      icon: "warning",
      title: "Access Denied",
      text: "You do not have permission to view this page.",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleRoute;
