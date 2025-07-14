import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaCheckCircle,
  FaHandHoldingHeart,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import RequestModal from "../../components/modals/RequestModal";
import ReviewModal from "../../components/modals/ReviewModal";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useUserRole } from "../../hooks/useUserRole";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: donation = {}, refetch } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/donation/${id}`);
      return res.data;
    },
  });

  const handleFavorite = async () => {
    try {
      const res = await axiosSecure.post("/favorites", {
        donationId: id,
      });
      if (res.data.insertedId) {
        Swal.fire("Saved!", "Donation added to favorites.", "success");
      }
    } catch (err) {
      Swal.fire(
        "Oops!",
        err.response?.data?.error || "Already favorited",
        "info"
      );
    }
  };

  const handlePickupConfirm = async () => {
    try {
      const res = await axiosSecure.patch(`/requests/confirm/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Marked as Picked Up", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to confirm pickup", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Donation Details */}
      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full lg:w-1/2 h-96 object-cover"
        />
        <div className="p-6 flex-1 space-y-3">
          <h2 className="text-3xl font-bold text-primary">{donation.title}</h2>
          <p>
            <span className="font-semibold">Food Type:</span>{" "}
            {donation.foodType}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {donation.quantity}
          </p>
          <p>
            <span className="font-semibold">Pickup Time:</span>{" "}
            {donation.pickupTime}
          </p>
          <p>
            <span className="font-semibold">Restaurant:</span>{" "}
            {donation.restaurant?.name}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {donation.location}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="badge badge-info text-white">
              {donation.status === "Verified" ? "Available" : donation.status}
            </span>
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleFavorite}
              className="btn btn-outline btn-accent w-full"
            >
              <FaHeart className="mr-2" /> Save to Favorites
            </button>

            {role === "charity" && donation.status === "Verified" && (
              <button
                onClick={() => setShowRequestModal(true)}
                className="btn btn-primary w-full"
              >
                <FaHandHoldingHeart className="mr-2" /> Request Donation
              </button>
            )}

            {role === "charity" && donation.status === "Accepted" && (
              <button
                onClick={handlePickupConfirm}
                className="btn btn-success w-full"
              >
                <FaCheckCircle className="mr-2" /> Confirm Pickup
              </button>
            )}

            <button
              onClick={() => setShowReviewModal(true)}
              className="btn btn-secondary w-full"
            >
              <MdReviews className="mr-2" /> Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaStar className="text-yellow-400" /> User Reviews
        </h3>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-base-200 p-5 rounded-lg shadow flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={review.userImage || "/default-avatar.png"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">{review.name}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {review.description}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>

      {/* Modals */}
      {showRequestModal && (
        <RequestModal
          donation={donation}
          user={user}
          onClose={() => setShowRequestModal(false)}
          refetch={refetch}
        />
      )}
      {showReviewModal && (
        <ReviewModal
          donationId={id}
          user={user}
          onClose={() => setShowReviewModal(false)}
          refetch={refetchReviews}
        />
      )}
    </div>
  );
};

export default DonationDetails;
