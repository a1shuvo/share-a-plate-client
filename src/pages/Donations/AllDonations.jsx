import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import Loader from "../../components/shared/Loader";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["active-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/active");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // Filter by location
  const filtered = donations.filter((donation) =>
    donation.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by quantity or pickupTime
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "quantity") {
      const aQty = parseFloat(a.quantity);
      const bQty = parseFloat(b.quantity);
      return bQty - aQty;
    }
    if (sortBy === "pickupTime") {
      return a.pickupTime.localeCompare(b.pickupTime);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary uppercase">
        All Donations
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        {/* Search by location */}
        <input
          type="text"
          placeholder="Search by location (e.g., Gulshan, Dhaka)"
          className="input input-bordered w-full md:max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort by */}
        <select
          className="select select-bordered w-full md:max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="quantity">Quantity (High to Low)</option>
          <option value="pickupTime">Pickup Time (A-Z)</option>
        </select>
      </div>

      {/* Donations Grid */}
      {sorted.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No donations found.
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((donation) => (
            <div
              key={donation._id}
              className="rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden bg-base-100 border border-base-200"
            >
              <figure className="h-52 overflow-hidden">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </figure>

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-primary">
                  {donation.title}
                </h3>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {donation.restaurant?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Location:</span>{" "}
                  {donation.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {donation.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Pickup Time:</span>{" "}
                  {donation.pickupTime}
                </p>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <div
                    className={`badge text-white ${
                      donation.status === "Verified"
                        ? "badge-success"
                        : donation.status === "Requested"
                        ? "badge-info"
                        : donation.status === "Picked Up"
                        ? "badge-neutral"
                        : donation.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {donation.status === "Verified"
                      ? "Available"
                      : donation.status}
                  </div>
                </div>

                <Link
                  to={`/donation/${donation._id}`}
                  className="btn btn-outline btn-primary mt-4 w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
