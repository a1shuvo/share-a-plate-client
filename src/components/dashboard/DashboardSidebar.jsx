import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaDollarSign,
  FaDonate,
  FaHandsHelping,
  FaHeart,
  FaHome,
  FaPlus,
  FaStar,
  FaTachometerAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const DashboardSidebar = ({ isMobile, closeSidebar }) => {
  const { user } = useAuth();
  const [role, setRole] = useState("user"); // Default role

  // TODO: Replace with real role fetch or useUserRole()
  useEffect(() => {
    // Simulate backend role fetch
    setTimeout(() => {
      setRole(user?.role || "user");
    }, 100);
  }, [user]);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-primary hover:text-white transition duration-200 ${
      isActive ? "bg-primary text-white" : "text-gray-700"
    }`;

  return (
    <div
      className={`w-64 bg-white h-screen p-4 border-r shadow-sm ${
        isMobile ? "fixed z-50 top-0 left-0" : "hidden md:block"
      }`}
    >
      <div className="mb-6 text-xl font-bold text-primary px-4">
        ShareAPlate
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={navLinkClass} onClick={closeSidebar}>
          <FaHome /> Home
        </NavLink>

        {/* Role-based links */}
        {role === "admin" && (
          <>
            <NavLink
              to="/dashboard/admin"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaChartBar /> Overview
            </NavLink>
            <NavLink
              to="/dashboard/users"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaUsers /> Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/reports"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaClipboardList /> Review Reports
            </NavLink>
          </>
        )}

        {role === "restaurant" && (
          <>
            <NavLink
              to="/dashboard/restaurant"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaChartBar /> My Donations
            </NavLink>
            <NavLink
              to="/dashboard/add-donation"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaPlus /> Add Donation
            </NavLink>
          </>
        )}

        {role === "charity" && (
          <>
            <NavLink
              to="/dashboard/charity"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaHandsHelping /> My Requests
            </NavLink>
            <NavLink
              to="/dashboard/request-donations"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaDonate /> Available Donations
            </NavLink>
          </>
        )}

        {role === "user" && (
          <>
            <NavLink to="/dashboard/user" className={navLinkClass}>
              <FaTachometerAlt className="text-lg" /> Dashboard
            </NavLink>

            <NavLink to="/dashboard/user/profile" className={navLinkClass}>
              <FaUser className="text-lg" /> My Profile
            </NavLink>

            <NavLink to="/dashboard/upgrade-role" className={navLinkClass}>
              <FaHandsHelping className="text-lg" /> Request Charity Role
            </NavLink>

            <NavLink to="/dashboard/user/favorites" className={navLinkClass}>
              <FaHeart className="text-lg" /> Favorites
            </NavLink>

            <NavLink to="/dashboard/user/reviews" className={navLinkClass}>
              <FaStar className="text-lg" /> My Reviews
            </NavLink>

            <NavLink to="/dashboard/user/transactions" className={navLinkClass}>
              <FaDollarSign className="text-lg" /> Transaction History
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
