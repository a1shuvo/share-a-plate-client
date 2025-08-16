import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
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

  if (isLoading) return <Loader />;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-base-100">
      <h2 className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 text-center">
        <FaStar className="text-4xl sm:text-3xl text-secondary" />
        <span className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-white">
          Featured Donations
        </span>
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg">
          No featured donations available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="card bg-base-200 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 border border-base-200 rounded-xl overflow-hidden"
            >
              <figure className="h-52 overflow-hidden">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>
              <div className="card-body flex flex-col justify-between">
                <div>
                  <h3 className="card-title text-lg md:text-xl font-semibold text-primary">
                    {donation.title}
                  </h3>
                  <p className="text-sm md:text-base mt-1">
                    <span className="font-semibold">Food Type:</span>{" "}
                    {donation.foodType}
                  </p>
                  <p className="text-sm md:text-base mt-1">
                    <span className="font-semibold">Restaurant:</span>{" "}
                    {donation.restaurant?.name}
                  </p>
                  <p className="text-sm md:text-base mt-1">
                    <span className="font-semibold">Location:</span>{" "}
                    {donation.location}
                  </p>
                  <div className="mt-2">
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
                </div>
                <div className="card-actions mt-4">
                  <Link
                    to={`/donation/${donation._id}`}
                    className="btn btn-outline btn-primary btn-sm w-full hover:scale-105 transition-transform"
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
