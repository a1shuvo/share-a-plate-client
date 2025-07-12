import { useQuery } from "@tanstack/react-query";
import {
  FaClipboardCheck,
  FaDollarSign,
  FaHandHoldingHeart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch total users
  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch all donations
  const { data: donations = [] } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  // Fetch pending role requests
  const { data: roleRequests = [] } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  // Fetch all transactions
  const { data: transactions = [] } = useQuery({
    queryKey: ["adminTransactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/transactions");
      return res.data;
    },
  });

  // Featured donations
  const featured = donations.filter((d) => d.isFeatured);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welcome Admin, {user?.displayName} 👋
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <DashboardCard
          title="Total Users"
          value={users.length}
          icon={<FaUsers />}
          bgColor="bg-indigo-600"
        />
        <DashboardCard
          title="Total Donations"
          value={donations.length}
          icon={<FaUtensils />}
          bgColor="bg-emerald-600"
        />
        <DashboardCard
          title="Pending Role Requests"
          value={roleRequests.filter((r) => r.status === "Pending").length}
          icon={<FaClipboardCheck />}
          bgColor="bg-orange-500"
        />
        <DashboardCard
          title="Featured Donations"
          value={featured.length}
          icon={<FaHandHoldingHeart />}
          bgColor="bg-pink-500"
        />
        <DashboardCard
          title="Transactions"
          value={transactions.length}
          icon={<FaDollarSign />}
          bgColor="bg-blue-500"
        />
      </div>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h3 className="text-lg font-semibold mb-2">Admin Info</h3>
        <p>
          <strong>Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
