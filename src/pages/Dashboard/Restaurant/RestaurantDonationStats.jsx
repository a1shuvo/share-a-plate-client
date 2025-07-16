import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../../components/shared/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const RestaurantDonationStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["donationStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations/statistics?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-primary flex justify-center items-center gap-2 mb-4">
          Donation Statistics
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Quantity-wise breakdown of your food donations by type. Visualized
          with actual values and units.
        </p>
      </div>

      {isLoading ? (
        <Loader></Loader>
      ) : stats.length === 0 ? (
        <div className="text-center text-gray-500">No donation data found.</div>
      ) : (
        <div className="w-full bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="foodType" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}`, "Total Quantity"]} />
              <Legend />
              <Bar dataKey="totalQuantity" fill="#60A5FA">
                {/* Show total quantity as label above bar */}
                <LabelList
                  dataKey="totalQuantity"
                  position="top"
                  formatter={(val) => `${val}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Show raw quantity strings underneath */}
          <div className="mt-6 space-y-4">
            {stats.map((item, index) => (
              <div key={index} className="border-b pb-3">
                <h4 className="text-lg font-semibold text-primary">
                  {item.foodType}
                </h4>
                <p className="text-sm text-gray-600">
                  Raw Entries:{" "}
                  <span className="text-gray-800">
                    {item.rawQuantities?.join(", ")}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDonationStats;
