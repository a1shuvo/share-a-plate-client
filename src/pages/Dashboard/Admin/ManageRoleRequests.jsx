import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../components/shared/Loader";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all role requests
  const { data: roleRequests = [], isLoading } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  // Approve role request
  const approveMutation = useMutation({
    mutationFn: async ({ email, id }) => {
      await axiosSecure.patch(`/users/role-by-email/${email}`, {
        role: "charity",
      });
      await axiosSecure.patch(`/role-requests/${id}`, {
        status: "Approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["roleRequests"]);
      Swal.fire({
        title: "Success",
        text: "Role request approved",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
      });
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  // Reject role request
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/role-requests/${id}`, {
        status: "Rejected",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["roleRequests"]);
      Swal.fire("Rejected", "Role request rejected", "info");
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  const handleApprove = (email, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will approve and assign the Charity role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate({ email, id });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this request?",
      text: "This will mark the request as Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Manage Role Requests
      </h2>

      {isLoading ? (
        <Loader></Loader>
      ) : roleRequests.length === 0 ? (
        <p>No role requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Mission</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roleRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.organizationName}</td>
                  <td>
                    <div
                      className="tooltip tooltip-top"
                      data-tip={req.missionStatement}
                    >
                      <span className="line-clamp-1 w-[100px] truncate">
                        {req.missionStatement || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td>{req.transactionId}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === "Approved"
                          ? "badge-success"
                          : req.status === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(req.email, req._id)}
                          className="btn btn-success btn-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-error btn-xs"
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
        </div>
      )}
    </div>
  );
};

export default ManageRoleRequests;
