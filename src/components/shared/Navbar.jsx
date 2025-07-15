import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { useUserRole } from "../../hooks/useUserRole";
import Loader from "./Loader";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire("Logged out successfully", "", "success");
      navigate("/login");
    } catch (error) {
      Swal.fire("Logout Failed", error.message, "error");
    }
  };

  // Get dashboard route by role
  const getDashboardPath = () => {
    switch (role) {
      case "admin":
        return "/dashboard/admin";
      case "charity":
        return "/dashboard/charity";
      case "restaurant":
        return "/dashboard/restaurant";
      case "user":
        return "/dashboard/user";
      default:
        return "/dashboard";
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="text-base font-medium">
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/all-donations" className="text-base font-medium">
              All Donations
            </NavLink>
          </li>
          <li>
            <NavLink to={getDashboardPath()} className="text-base font-medium">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost p-2 lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 z-50 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold text-primary">
          ShareAPlate
        </Link>
      </div>

      {/* Center menu - Desktop only */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* Right side */}
      <div className="navbar-end">
        {loading ? (
          <Loader></Loader>
        ) : user ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="user avatar"
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-error"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
