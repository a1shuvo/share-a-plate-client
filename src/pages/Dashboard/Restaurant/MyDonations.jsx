import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations/mine/all?email=${user?.email}`
      );
      console.log(res.data);

      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donations/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myDonations"]);
      Swal.fire("Deleted!", "Donation has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Could not delete donation.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this donation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Donations</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="card shadow-md bg-white rounded-md overflow-hidden border"
            >
              <figure>
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold">{donation.title}</h3>
                <p>
                  <strong>Food Type:</strong> {donation.foodType}
                </p>
                <p>
                  <strong>Quantity:</strong> {donation.quantity}
                </p>
                <p>
                  <strong>Restaurant:</strong> {donation.restaurant.name}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      donation.status === "Verified"
                        ? "badge-success"
                        : donation.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {donation.status}
                  </span>
                </p>

                <div className="flex gap-2 mt-3">
                  {donation.status !== "Rejected" && (
                    <Link
                      to={`/dashboard/update-donation/${donation._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
