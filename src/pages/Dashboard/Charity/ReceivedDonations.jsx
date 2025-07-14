import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewModal from "../../../components/modals/ReviewModal";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: donations = [], refetch } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/received");
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        Received Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations picked up yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation.donationId}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-200"
            >
              <div className="card-body space-y-2">
                <h3 className="text-xl font-bold text-primary">
                  {donation.donationTitle}
                </h3>
                <p>
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {donation.restaurantName}
                </p>
                <p>
                  <span className="font-semibold">Food Type:</span>{" "}
                  {donation.foodType}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {donation.quantity}
                </p>
                <p>
                  <span className="font-semibold">Pickup Time:</span>{" "}
                  {donation.pickupTime}
                </p>

                <button
                  onClick={() => setSelectedDonation(donation)}
                  className="btn btn-secondary mt-4 flex items-center gap-2"
                >
                  <FaStar /> Add Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📝 Review Modal */}
      {selectedDonation && (
        <ReviewModal
          donationId={selectedDonation.donationId}
          user={user}
          onClose={() => setSelectedDonation(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ReceivedDonations;
