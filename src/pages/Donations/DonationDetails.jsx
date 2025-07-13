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

  // ✅ Save to Favorites
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

  // ✅ Confirm Pickup
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
    <div className="max-w-6xl mx-auto p-6">
      {/* 💾 Donation Details Card */}
      <div className="card lg:card-side bg-base-100 shadow-xlnj">
        <figure className="w-full lg:w-1/2">
          <img
            src={donation.image}
            alt={donation.title}
            className="object-cover h-96 w-full rounded-l-lg"
          />
        </figure>
        <div className="card-body w-full lg:w-1/2">
          <h2 className="card-title text-3xl font-bold text-primary">
            {donation.title}
          </h2>
          <div className="space-y-1 text-base">
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
            <p>
              <span className="font-semibold">Restaurant:</span>{" "}
              {donation.restaurant?.name}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {donation.location}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="badge badge-info text-white">
                {donation.status === "Verified" ? "Available" : donation.status}
              </span>
            </p>
          </div>

          {/* 🔘 Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
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

      {/* 📝 Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-400" /> Reviews
        </h3>
        {donation.reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donation.reviews.map((review, idx) => (
              <div
                key={idx}
                className="border p-4 rounded-lg bg-base-200 shadow"
              >
                <p className="font-semibold text-lg">{review.name}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {review.description}
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>

      {/* 📦 Modals */}
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
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default DonationDetails;
