import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../components/shared/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ✅ Fetch all requests made by this charity user
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/mine");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Cancel request mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/requests/${id}`);
    },
    onSuccess: (_, id) => {
      // Optimistically remove from cache
      queryClient.setQueryData(["myRequests", user?.email], (old) =>
        old?.filter((req) => req._id !== id)
      );

      Swal.fire("Success", "Your request was cancelled", "success");
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to cancel", "error");
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel your donation request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      cancelMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        My Donation Requests
      </h2>

      {isLoading ? (
        <Loader></Loader>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-400">No requests found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-base-100 border shadow hover:shadow-lg transition-all"
            >
              <div className="card-body">
                <h3 className="card-title text-primary">{req.donationTitle}</h3>
                <p>
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {req.restaurantName}
                </p>
                <p>
                  <span className="font-semibold">Food Type:</span>{" "}
                  {req.foodType || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {req.quantity || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`badge text-white ${
                      req.status === "Pending"
                        ? "badge-warning"
                        : req.status === "Accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="btn btn-outline btn-error mt-4 w-full"
                  >
                    <FaTimesCircle className="mr-2" /> Cancel Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
