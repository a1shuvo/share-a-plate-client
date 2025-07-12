import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CheckoutWrapper from "../../../components/payment/CheckoutWrapper";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const RequestCharityRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null); // Holds form input to pass to CheckoutWrapper

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch existing role request
  const { data: existingRequest, isLoading } = useQuery({
    queryKey: ["roleRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role-requests/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Handle form submit → open modal
  const onSubmit = (data) => {
    if (
      existingRequest?.status === "Pending" ||
      existingRequest?.status === "Approved"
    ) {
      return Swal.fire({
        icon: "info",
        title: "Request Exists",
        text: `You already have a ${existingRequest.status} request.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }

    setFormData(data);
    setShowModal(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Request Charity Role</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">
          Checking existing request...
        </p>
      ) : existingRequest?.status === "Pending" ||
        existingRequest?.status === "Approved" ? (
        <p className="bg-gray-100 p-4 text-center rounded">
          You already have a <strong>{existingRequest.status}</strong> role
          request.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name (readonly) */}
          <input
            className="input input-bordered w-full"
            value={user?.displayName}
            readOnly
          />

          {/* Email (readonly) */}
          <input
            className="input input-bordered w-full"
            value={user?.email}
            readOnly
          />

          {/* Organization Name */}
          <input
            {...register("organizationName", {
              required: "Organization name is required",
            })}
            placeholder="Organization Name"
            className="input input-bordered w-full"
          />
          {errors.organizationName && (
            <p className="text-red-500 text-sm">
              {errors.organizationName.message}
            </p>
          )}

          {/* Mission Statement */}
          <textarea
            {...register("missionStatement", {
              required: "Mission statement is required",
            })}
            placeholder="Mission Statement"
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.missionStatement && (
            <p className="text-red-500 text-sm">
              {errors.missionStatement.message}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Pay $25 & Request
          </button>
        </form>
      )}

      {/* Stripe Payment Modal */}
      {showModal && formData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Complete Your Payment</h3>
            {/* CheckoutWrapper renders Stripe Elements & handles API calls */}
            <CheckoutWrapper
              formData={formData}
              onClose={() => setShowModal(false)}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCharityRole;
