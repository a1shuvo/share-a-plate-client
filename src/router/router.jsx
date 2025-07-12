import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Favorites from "../pages/Dashboard/User/Favorites";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import RequestCharityRole from "../pages/Dashboard/User/RequestCharityRole";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import RoleRoute from "../routes/RoleRoute";

// Dashboard Pages (by role)

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      // {
      //   path: "/all-donations",
      //   element: (
      //     <PrivateRoute>
      //       <AllDonations />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/donation/:id",
      //   element: (
      //     <PrivateRoute>
      //       <DonationDetails />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "user",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <UserDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "user/profile",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <MyProfile />
          </RoleRoute>
        ),
      },
      {
        path: "upgrade-role",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <RequestCharityRole />
          </RoleRoute>
        ),
      },
      {
        path: "user/favorites",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <Favorites />
          </RoleRoute>
        ),
      },
      {
        path: "user/reviews",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <MyReviews />
          </RoleRoute>
        ),
      },
      {
        path: "user/transactions",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <TransactionHistory />
          </RoleRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
