import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegStar, FaStar } from "react-icons/fa";
import Loader from "../../../components/shared/Loader";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Get all verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/active");
      return res.data;
    },
  });

  // ✅ Mutation for toggle feature
  const { mutate: toggleFeature, isPending } = useMutation({
    mutationFn: async (donation) => {
      return await axiosSecure.patch(`/donations/feature/${donation._id}`, {
        isFeatured: !donation.isFeatured,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verifiedDonations"]);
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Feature Donations
      </h2>

      {isLoading ? (
        <Loader></Loader>
      ) : donations.length === 0 ? (
        <div className="text-center text-gray-500">
          No verified donations found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="text-base text-primary">
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Food Type</th>
                <th>Restaurant</th>
                <th>Feature</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={donation.image}
                      alt={donation.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{donation.title}</td>
                  <td>{donation.foodType || "N/A"}</td>
                  <td>{donation.restaurant?.name || "Unknown"}</td>
                  <td>
                    <button
                      disabled={isPending}
                      onClick={() => toggleFeature(donation)}
                      className={`btn btn-sm ${
                        donation.isFeatured ? "btn-success" : "btn-outline"
                      }`}
                    >
                      {donation.isFeatured ? (
                        <>
                          <FaStar className="mr-1 text-yellow-400" />
                          Featured
                        </>
                      ) : (
                        <>
                          <FaRegStar className="mr-1" />
                          Feature
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeatureDonations;
