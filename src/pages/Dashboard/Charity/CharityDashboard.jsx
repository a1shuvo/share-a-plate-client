import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const CharityDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myRequests = [] } = useQuery({
    queryKey: ["charity-my-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity/my-requests?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: myPickups = [] } = useQuery({
    queryKey: ["charity-pickups", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity/my-pickups?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: receivedDonations = [] } = useQuery({
    queryKey: ["charity-received-donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/charity/received-donations?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["charity-transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName} 👋
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <DashboardCard
          title="My Requests"
          value={myRequests.length}
          icon={<FaClipboardList />}
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="My Pickups"
          value={myPickups.length}
          icon={<FaClock />}
          bgColor="bg-yellow-500"
        />
        <DashboardCard
          title="Received Donations"
          value={receivedDonations.length}
          icon={<FaCheckCircle />}
          bgColor="bg-green-600"
        />
        <DashboardCard
          title="Transactions"
          value={transactions.length}
          icon={<FaDollarSign />}
          bgColor="bg-purple-600"
        />
      </div>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h3 className="text-lg font-semibold mb-2">Charity Profile</h3>
        <p>
          <strong>Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> Charity
        </p>
        {/* Optional fields like mission statement, contact info can be added here */}
      </div>
    </div>
  );
};

export default CharityDashboard;
