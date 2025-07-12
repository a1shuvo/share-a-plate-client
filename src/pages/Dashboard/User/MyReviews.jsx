import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/reviews/${id}`);
    refetch();
  };

  return (
    <div className="grid gap-4">
      {reviews.map((r) => (
        <div key={r._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">{r.donationTitle}</h3>
          <p className="text-sm text-gray-500">
            {r.restaurantName} • {new Date(r.createdAt).toLocaleString()}
          </p>
          <p className="mt-2">{r.description}</p>
          <button
            onClick={() => handleDelete(r._id)}
            className="btn btn-sm btn-error mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
