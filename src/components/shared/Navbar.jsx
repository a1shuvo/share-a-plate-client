import { FiLogOut } from "react-icons/fi"; // Logout icon
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        title: "Logged out successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire("Logout Failed", error.message, "error");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="text-base font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="text-base font-medium">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/upgrade-role" className="text-base font-medium">
          Become a Charity
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
            <NavLink to="/dashboard" className="text-base font-medium">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4">
      {/* Navbar Start */}
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
        <Logo />
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <div className="avatar">
                <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="user avatar"
                  />
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                >
                  <FiLogOut />
                  Logout
                </button>
              </li>
            </ul>
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
