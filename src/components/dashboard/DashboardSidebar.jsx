import {
  FaChartBar,
  FaClipboardList,
  FaDollarSign,
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
  FaUtensils,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { useUserRole } from "../../hooks/useUserRole";

const DashboardSidebar = ({ isMobile, closeSidebar }) => {
  const { role } = useUserRole();

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
              <FaTachometerAlt className="text-lg" /> Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/restaurant/profile"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaUser className="text-lg" /> Restaurant Profile
            </NavLink>

            <NavLink
              to="/dashboard/add-donation"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaPlus className="text-lg" /> Add Donation
            </NavLink>

            <NavLink
              to="/dashboard/restaurant/my-donations"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaUtensils className="text-lg" /> My Donations
            </NavLink>

            <NavLink
              to="/dashboard/restaurant/requests"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaClipboardList className="text-lg" /> Requested Donations
            </NavLink>
            <NavLink
              to="/dashboard/restaurant/statistics"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaChartBar className="text-lg" /> Donations Statistics
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
              <FaTachometerAlt className="text-lg" /> Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/charity/profile"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaUser className="text-lg" /> Charity Profile
            </NavLink>

            <NavLink
              to="/dashboard/charity/my-requests"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaClipboardList className="text-lg" /> My Requests
            </NavLink>

            <NavLink
              to="/dashboard/charity/my-pickups"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaHandsHelping className="text-lg" /> My Pickups
            </NavLink>

            <NavLink
              to="/dashboard/charity/received-donations"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaHandHoldingHeart className="text-lg" /> Received Donations
            </NavLink>

            <NavLink
              to="/dashboard/charity/transactions"
              className={navLinkClass}
              onClick={closeSidebar}
            >
              <FaDollarSign className="text-lg" /> Transaction History
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
