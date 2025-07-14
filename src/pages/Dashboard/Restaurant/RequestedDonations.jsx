import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/restaurant");
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requests/accept/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurantRequests"]);
      Swal.fire("Accepted", "Request accepted successfully.", "success");
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to accept request", "error");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requests/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurantRequests"]);
      Swal.fire("Rejected", "Request rejected successfully.", "info");
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to reject request", "error");
    },
  });

  if (isLoading) {
    return <div className="text-center my-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Requested Donations
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Food Type</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Request Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.foodType || "N/A"}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td className="max-w-xs break-words">
                  {req.requestDescription || "N/A"}
                </td>
                <td>{req.pickupTime}</td>
                <td>
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
                </td>
                <td className="flex flex-wrap gap-2 justify-center items-center">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => acceptMutation.mutate(req._id)}
                        className="btn btn-sm btn-success"
                      >
                        <FaCheckCircle className="mr-1" /> Accept
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(req._id)}
                        className="btn btn-sm btn-error"
                      >
                        <FaTimesCircle className="mr-1" /> Reject
                      </button>
                    </>
                  )}
                  {(req.status === "Accepted" || req.status === "Rejected") && (
                    <span className="text-sm text-gray-500 italic">
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center p-6 text-gray-500">
            No requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedDonations;
