import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import FeatureDonations from "../pages/Dashboard/Admin/FeatureDonations";
import ManageDonations from "../pages/Dashboard/Admin/ManageDonations";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests";
import ManageRoleRequests from "../pages/Dashboard/Admin/ManageRoleRequests";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import CharityDashboard from "../pages/Dashboard/Charity/CharityDashboard";
import CharityProfile from "../pages/Dashboard/Charity/CharityProfile";
import CharityTransactionHistory from "../pages/Dashboard/Charity/CharityTransactionHistory";
import MyRequests from "../pages/Dashboard/Charity/MyRequests";
import AddDonation from "../pages/Dashboard/Restaurant/AddDonation";
import MyDonations from "../pages/Dashboard/Restaurant/MyDonations";
import RequestedDonations from "../pages/Dashboard/Restaurant/RequestedDonations";
import RestaurantDashboard from "../pages/Dashboard/Restaurant/RestaurantDashboard";
import RestaurantProfile from "../pages/Dashboard/Restaurant/RestaurantProfile";
import UpdateDonation from "../pages/Dashboard/Restaurant/UpdateDonation";
import Favorites from "../pages/Dashboard/User/Favorites";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import RequestCharityRole from "../pages/Dashboard/User/RequestCharityRole";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import AllDonations from "../pages/Donations/AllDonations";
import DonationDetails from "../pages/Donations/DonationDetails";
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
      {
        path: "/all-donations",
        element: (
          <PrivateRoute>
            <AllDonations />
          </PrivateRoute>
        ),
      },
      {
        path: "/donation/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
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
      // ===== USER ROUTES =====
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

      // ===== ADMIN ROUTES =====
      {
        path: "admin",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminProfile />
          </RoleRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "admin/manage-donations",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageDonations />
          </RoleRoute>
        ),
      },
      {
        path: "admin/manage-role-requests",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageRoleRequests />
          </RoleRoute>
        ),
      },
      {
        path: "admin/manage-requests",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageRequests />
          </RoleRoute>
        ),
      },
      {
        path: "admin/feature-donations",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <FeatureDonations />
          </RoleRoute>
        ),
      },

      // ===== CHARITY ROUTES =====
      {
        path: "charity",
        element: (
          <RoleRoute allowedRoles={["charity"]}>
            <CharityDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "charity/profile",
        element: (
          <RoleRoute allowedRoles={["charity"]}>
            <CharityProfile />
          </RoleRoute>
        ),
      },
      {
        path: "charity/my-requests",
        element: (
          <RoleRoute allowedRoles={["charity"]}>
            <MyRequests />
          </RoleRoute>
        ),
      },
      // {
      //   path: "charity/my-pickups",
      //   element: (
      //     <RoleRoute allowedRoles={["charity"]}>
      //       <MyPickups />
      //     </RoleRoute>
      //   ),
      // },
      // {
      //   path: "charity/received-donations",
      //   element: (
      //     <RoleRoute allowedRoles={["charity"]}>
      //       <ReceivedDonations />
      //     </RoleRoute>
      //   ),
      // },
      {
        path: "charity/transactions",
        element: (
          <RoleRoute allowedRoles={["charity"]}>
            <CharityTransactionHistory />
          </RoleRoute>
        ),
      },

      // ===== RESTAURANT ROUTES =====
      {
        path: "restaurant",
        element: (
          <RoleRoute allowedRoles={["restaurant"]}>
            <RestaurantDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "restaurant/profile",
        element: (
          <RoleRoute allowedRoles={["restaurant"]}>
            <RestaurantProfile />
          </RoleRoute>
        ),
      },
      {
        path: "add-donation",
        element: (
          <RoleRoute allowedRoles={["restaurant"]}>
            <AddDonation />
          </RoleRoute>
        ),
      },
      {
        path: "restaurant/my-donations",
        element: (
          <RoleRoute allowedRoles={["restaurant"]}>
            <MyDonations />
          </RoleRoute>
        ),
      },
      {
        path: "update-donation/:id",
        element: (
          <RoleRoute allowedRoles={["restaurant"]}>
            <UpdateDonation />
          </RoleRoute>
        ),
      },
      {
        path: "restaurant/requests",
        element: (
          <RoleRoute allowedRoles={["restaurant"]}>
            <RequestedDonations />
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
