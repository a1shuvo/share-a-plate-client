import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { useUserRole } from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, loading } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect base /dashboard to role-specific subpath
  useEffect(() => {
    if (!loading && location.pathname === "/dashboard" && role) {
      const path =
        {
          admin: "/dashboard/admin",
          charity: "/dashboard/charity",
          restaurant: "/dashboard/restaurant",
          user: "/dashboard/user",
        }[role] || "/dashboard";

      navigate(path, { replace: true });
    }
  }, [loading, role, location.pathname, navigate]);

  return (
    <div className="drawer lg:drawer-open">
      {/* Mobile toggle checkbox */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        <DashboardHeader />
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="w-64 h-full">
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
