import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../components/shared/Loader";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/admin/all");
      return res.data;
    },
  });

  const { mutate: deleteRequest } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/requests/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["adminRequests"], (old) =>
        old.filter((r) => r._id !== id)
      );
      Swal.fire("Deleted!", "Request has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the request", "error");
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to permanently delete this request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteRequest(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Manage All Donation Requests
      </h2>

      {isLoading ? (
        <Loader></Loader>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-500">No requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold text-base-content">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={req._id}>
                  <td>{idx + 1}</td>
                  <td>{req.donationTitle}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>
                    <div
                      className="tooltip tooltip-top"
                      data-tip={req.requestDescription}
                    >
                      <span className="line-clamp-1 max-w-xs truncate inline-block">
                        {req.requestDescription || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-outline btn-error btn-sm"
                    >
                      <FaTrashAlt className="mr-1" /> Delete
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

export default ManageRequests;
