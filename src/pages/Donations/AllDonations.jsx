import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary uppercase">
        All Donations
      </h2>

      {donations.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No donations found.
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
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
                {donation.charity?.name && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Assigned To:</span>{" "}
                    {donation.charity.name}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <div
                    className={`badge ${
                      donation.status === "Verified"
                        ? "badge-success"
                        : "badge-ghost"
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
