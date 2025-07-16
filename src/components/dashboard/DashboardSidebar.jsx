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
  FaTimes,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { useUserRole } from "../../hooks/useUserRole";

const DashboardSidebar = () => {
  const { role } = useUserRole();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
      isActive
        ? "bg-primary text-white"
        : "hover:bg-primary/10 text-gray-700 hover:text-primary"
    }`;

  return (
    <div className="menu bg-base-100 p-4 w-64 min-h-screen shadow-2xl">
      {/* Only show on mobile */}
      <div className="lg:hidden absolute right-2 top-2 z-50">
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-sm btn-circle btn-ghost"
        >
          <FaTimes />
        </label>
      </div>

      <h2 className="text-xl font-bold text-primary px-2 mb-4 mt-2">
        ShareAPlate
      </h2>

      <NavLink to="/" className={navLinkClass}>
        <FaHome /> Home
      </NavLink>

      {/* Admin */}
      {role === "admin" && (
        <>
          <NavLink to="/dashboard/admin" className={navLinkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/admin/profile" className={navLinkClass}>
            <FaUser /> Admin Profile
          </NavLink>
          <NavLink to="/dashboard/admin/manage-users" className={navLinkClass}>
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

      {/* Restaurant */}
      {role === "restaurant" && (
        <>
          <NavLink to="/dashboard/restaurant" className={navLinkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/restaurant/profile" className={navLinkClass}>
            <FaUser /> Restaurant Profile
          </NavLink>
          <NavLink to="/dashboard/add-donation" className={navLinkClass}>
            <FaPlus /> Add Donation
          </NavLink>
          <NavLink
            to="/dashboard/restaurant/my-donations"
            className={navLinkClass}
          >
            <FaUtensils /> My Donations
          </NavLink>
          <NavLink to="/dashboard/restaurant/requests" className={navLinkClass}>
            <FaClipboardList /> Requested Donations
          </NavLink>
          <NavLink
            to="/dashboard/restaurant/statistics"
            className={navLinkClass}
          >
            <FaChartBar /> Donation Stats
          </NavLink>
        </>
      )}

      {/* Charity */}
      {role === "charity" && (
        <>
          <NavLink to="/dashboard/charity" className={navLinkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/charity/profile" className={navLinkClass}>
            <FaUser /> Charity Profile
          </NavLink>
          <NavLink to="/dashboard/charity/my-requests" className={navLinkClass}>
            <FaClipboardList /> My Requests
          </NavLink>
          <NavLink to="/dashboard/charity/my-pickups" className={navLinkClass}>
            <FaHandsHelping /> My Pickups
          </NavLink>
          <NavLink
            to="/dashboard/charity/received-donations"
            className={navLinkClass}
          >
            <FaHandHoldingHeart /> Received Donations
          </NavLink>
          <NavLink
            to="/dashboard/charity/transactions"
            className={navLinkClass}
          >
            <FaDollarSign /> Transactions
          </NavLink>
        </>
      )}

      {/* User */}
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
            <FaDollarSign /> Transactions
          </NavLink>
        </>
      )}
    </div>
  );
};

export default DashboardSidebar;
