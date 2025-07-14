import { useMutation, useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const MyPickups = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch accepted pickup requests
  const { data: pickups = [], refetch } = useQuery({
    queryKey: ["myPickups", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/my-pickups");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Confirm Pickup Mutation
  const { mutate: confirmPickup } = useMutation({
    mutationFn: async (donationId) => {
      const res = await axiosSecure.patch(`/requests/confirm/${donationId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Marked as Picked Up", "success");
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to confirm pickup", "error");
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        My Pickups
      </h2>

      {pickups.length === 0 ? (
        <p className="text-center text-gray-500">No assigned pickups yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pickups.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body space-y-2">
                <h3 className="text-xl font-bold text-primary">
                  {item.donationTitle}
                </h3>
                <p>
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {item.restaurantName}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {item.location || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Food Type:</span>{" "}
                  {item.foodType || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Pickup Time:</span>{" "}
                  {item.pickupTime}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`badge text-white ${
                      item.status === "Picked Up"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {item.status === "Picked Up" ? "Picked Up" : "Assigned"}
                  </span>
                </p>

                {item.status !== "Picked Up" && (
                  <button
                    className="btn btn-success w-full mt-3 flex items-center gap-2"
                    onClick={() => confirmPickup(item.donationId)}
                  >
                    <FaCheckCircle /> Confirm Pickup
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

export default MyPickups;
