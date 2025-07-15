import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaClipboardList,
  FaPlus,
  FaUtensils,
} from "react-icons/fa";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const RestaurantDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch My Donations
  const { data: donations = [] } = useQuery({
    queryKey: ["restaurantDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/mine/all`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch Requested Donations
  const { data: requests = [] } = useQuery({
    queryKey: ["donationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/restaurant?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName} 🍽️
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardCard
          title="My Donations"
          value={donations.length}
          icon={<FaUtensils />}
          bgColor="bg-green-600"
        />
        <DashboardCard
          title="Add Donation"
          value="Ready"
          icon={<FaPlus />}
          bgColor="bg-indigo-600"
        />
        <DashboardCard
          title="Requests"
          value={requests.length}
          icon={<FaClipboardList />}
          bgColor="bg-orange-500"
        />
        <DashboardCard
          title="Verified"
          value={donations.filter((d) => d.status === "Verified").length}
          icon={<FaCheckCircle />}
          bgColor="bg-teal-500"
        />
      </div>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h3 className="text-lg font-semibold mb-2">Account Info</h3>
        <p>
          <strong>Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> Restaurant
        </p>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
