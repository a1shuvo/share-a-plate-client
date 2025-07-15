import { useMutation, useQuery } from "@tanstack/react-query";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../components/shared/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch user's reviews
  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/mine/all");
      return res.data;
    },
  });

  // ✅ Handle delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Review removed successfully.", "success");
      refetch();
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err?.response?.data?.error || "Failed to delete",
        "error"
      );
    },
  });

  // ✅ Format date
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6">My Reviews</h2>

      {isLoading ? (
        <Loader></Loader>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't submitted any reviews yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-5 rounded-lg shadow-md bg-base-100 relative"
            >
              <div className="mb-2">
                <h3 className="text-xl font-bold text-primary">
                  {review.donationTitle}
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {review.restaurantName}
                </p>
                <p className="text-sm text-gray-400">
                  Reviewed on: {formatDate(review.createdAt)}
                </p>
              </div>

              <p className="text-gray-700 my-2">{review.description}</p>

              <div className="flex gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              <button
                onClick={() => deleteMutation.mutate(review._id)}
                className="btn btn-sm btn-error text-white absolute top-3 right-3"
              >
                <FaTrashAlt className="mr-1" /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
