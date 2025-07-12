import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import {
  FaHeart,
  FaStar,
  FaDollarSign,
  FaHandsHelping,
} from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch favorites count
  const { data: favorites = [] } = useQuery({
    queryKey: ["favoritesCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch reviews count
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviewsCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch transactions
  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch role request status
  const { data: roleRequest = null } = useQuery({
    queryKey: ["charityRoleRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role-requests/user/${user?.email}`);
      return res.data;
    },
    retry: false,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.displayName} 👋</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardCard
          title="Favorites"
          value={favorites.length}
          icon={<FaHeart />}
          bgColor="bg-pink-500"
        />
        <DashboardCard
          title="My Reviews"
          value={reviews.length}
          icon={<FaStar />}
          bgColor="bg-yellow-500"
        />
        <DashboardCard
          title="Transactions"
          value={transactions.length}
          icon={<FaDollarSign />}
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="Charity Role"
          value={roleRequest?.status || "Not Requested"}
          icon={<FaHandsHelping />}
          bgColor={
            roleRequest?.status === "Pending"
              ? "bg-orange-500"
              : roleRequest?.status === "Approved"
              ? "bg-green-600"
              : "bg-gray-500"
          }
        />
      </div>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h3 className="text-lg font-semibold mb-2">Account Info</h3>
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> User</p>
      </div>
    </div>
  );
};

export default UserDashboard;
