import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaDollarSign,
  FaDonate,
  FaEnvelopeOpenText,
  FaHandHoldingHeart,
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
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const DashboardSidebar = ({ isMobile, closeSidebar }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setRole(res.data.role || "user");
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [user, axiosSecure]);

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

        {/* Admin Routes */}
        {role === "admin" && (
          <>
            <NavLink to="/dashboard/admin" className={navLinkClass}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/admin/profile" className={navLinkClass}>
              <FaUser /> Admin Profile
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-users"
              className={navLinkClass}
            >
              <FaUsers /> Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-donations"
              className={navLinkClass}
            >
              <FaClipboardList /> Manage Donations
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-role-requests"
              className={navLinkClass}
            >
              <FaHandHoldingHeart /> Manage Role Requests
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-requests"
              className={navLinkClass}
            >
              <FaEnvelopeOpenText /> Manage Requests
            </NavLink>
            <NavLink
              to="/dashboard/admin/feature-donations"
              className={navLinkClass}
            >
              <FaStar /> Feature Donations
            </NavLink>
          </>
        )}

        {/* Restaurant Routes */}
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

        {/* Charity Routes */}
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

        {/* Regular User Routes */}
        {role === "user" && (
          <>
            <NavLink to="/dashboard/user" className={navLinkClass}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
            <NavLink to="/dashboard/user/profile" className={navLinkClass}>
              <FaUser /> My Profile
            </NavLink>
            <NavLink to="/dashboard/upgrade-role" className={navLinkClass}>
              <FaHandsHelping /> Request Charity Role
            </NavLink>
            <NavLink to="/dashboard/user/favorites" className={navLinkClass}>
              <FaHeart /> Favorites
            </NavLink>
            <NavLink to="/dashboard/user/reviews" className={navLinkClass}>
              <FaStar /> My Reviews
            </NavLink>
            <NavLink to="/dashboard/user/transactions" className={navLinkClass}>
              <FaDollarSign /> Transaction History
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
