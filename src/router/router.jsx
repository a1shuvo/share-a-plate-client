import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

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
  // {
  //   path: "/dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       path: "admin",
  //       element: (
  //         <RoleRoute allowedRoles={["admin"]}>
  //           <AdminDashboard />
  //         </RoleRoute>
  //       ),
  //     },
  //     {
  //       path: "user",
  //       element: (
  //         <RoleRoute allowedRoles={["user"]}>
  //           <UserDashboard />
  //         </RoleRoute>
  //       ),
  //     },
  //     {
  //       path: "charity",
  //       element: (
  //         <RoleRoute allowedRoles={["charity"]}>
  //           <CharityDashboard />
  //         </RoleRoute>
  //       ),
  //     },
  //     {
  //       path: "restaurant",
  //       element: (
  //         <RoleRoute allowedRoles={["restaurant"]}>
  //           <RestaurantDashboard />
  //         </RoleRoute>
  //       ),
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
