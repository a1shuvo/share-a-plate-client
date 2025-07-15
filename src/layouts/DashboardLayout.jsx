import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { useUserRole } from "../hooks/useUserRole";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { role, loading } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  // Utility: Get dashboard path based on role
  useEffect(() => {
    if (!loading && location.pathname === "/dashboard" && role) {
      const path = (() => {
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
      })();

      navigate(path, { replace: true });
    }
  }, [loading, role, location.pathname, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar
        isMobile={showSidebar}
        closeSidebar={() => setShowSidebar(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader toggleSidebar={() => setShowSidebar(!showSidebar)} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
