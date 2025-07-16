import { FaBars } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const DashboardHeader = () => {
  const { user } = useAuth();

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

      <div className="flex-none">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
