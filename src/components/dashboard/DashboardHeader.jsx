import { FaBars } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const DashboardHeader = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 py-2 flex justify-between items-center border-b sticky top-0 z-40">
      {/* Mobile toggle */}
      <button onClick={toggleSidebar} className="md:hidden text-xl">
        <FaBars />
      </button>

      <h1 className="text-lg font-semibold text-primary">Dashboard</h1>

      {/* User Avatar */}
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL || "/default-avatar.png"} alt="user" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
