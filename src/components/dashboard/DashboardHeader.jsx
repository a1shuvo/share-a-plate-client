import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../shared/ThemeToggle";

const DashboardHeader = () => {
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

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-40">
      <div className="flex-none md:hidden">
        <label htmlFor="dashboard-drawer" className="btn btn-ghost text-xl">
          <FaBars />
        </label>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold text-primary">Dashboard</h1>
      </div>

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

export default DashboardHeader;
