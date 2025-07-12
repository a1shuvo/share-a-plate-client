import { useState } from "react";
import { Outlet } from "react-router";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
