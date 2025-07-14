import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donations
  const {
    data: donations = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  // Mutation for status update
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donations/admin/status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (_, { status }) => {
      Swal.fire({
        icon: "success",
        title: `Donation ${status}`,
        text: `Donation has been marked as ${status}.`,
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to update donation", "error");
    },
  });

  const handleStatusUpdate = (id, status) => {
    mutation.mutate({ id, status });
  };

  if (isPending)
    return <p className="text-center py-10">Loading donations...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load donations</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Manage Donations</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant Name</th>
              <th>Restaurant Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurant.name}</td>
                <td>{donation.restaurant.email}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span
                    className={`badge whitespace-nowrap text-white ${
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
                    {donation.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {donation.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(donation._id, "Verified")
                        }
                        className="btn btn-xs btn-success"
                        disabled={mutation.isPending}
                      >
                        Verify
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(donation._id, "Rejected")
                        }
                        className="btn btn-xs btn-error"
                        disabled={mutation.isPending}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {donations.length === 0 && (
          <p className="text-center py-4 text-gray-500">No donations found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageDonations;
