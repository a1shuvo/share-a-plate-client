import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import Loader from "../shared/Loader";

const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/featured");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        🍽️ Featured Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No featured donations available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200"
            >
              <figure>
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-52 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold text-primary">
                  {donation.title}
                </h3>
                <p>
                  <span className="font-semibold">Food Type:</span>{" "}
                  {donation.foodType}
                </p>
                <p>
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {donation.restaurant?.name}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {donation.location}
                </p>
                <div>
                  <span
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
                  </span>
                </div>

                <div className="card-actions mt-4">
                  <Link
                    to={`/donation/${donation._id}`}
                    className="btn btn-outline btn-sm btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedDonations;
