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
  const [formData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: existingRequest = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["roleRequest", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const encodedEmail = encodeURIComponent(user.email);
        const res = await axiosSecure.get(
          `/role-requests/user/${encodedEmail}`
        );
        return res.data;
      } catch (err) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },
  });

  const onSubmit = (data) => {
    if (
      existingRequest?.status === "Pending" ||
      existingRequest?.status === "Approved"
    ) {
      return Swal.fire({
        icon: "info",
        title: "Request Already Exists",
        text: `You already have a ${existingRequest.status} request.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }

    setFormData(data);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Request Charity Role
      </h2>

      {isLoading ? (
        <div className="text-center">
          <span className="loading loading-spinner text-primary"></span>
          <p className="text-gray-500 mt-2">
            Checking your role request status...
          </p>
        </div>
      ) : existingRequest?.status === "Pending" ||
        existingRequest?.status === "Approved" ? (
        <div className="bg-info/10 border border-info text-info p-4 rounded text-center">
          <p>
            You already have a <strong>{existingRequest.status}</strong>{" "}
            request.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="label font-medium">Full Name</label>
            <input
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-medium">Email</label>
            <input
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-medium">Organization Name</label>
            <input
              {...register("organizationName", {
                required: "Organization name is required",
              })}
              placeholder="Enter organization name"
              className="input input-bordered w-full"
            />
            {errors.organizationName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          <div>
            <label className="label font-medium">Mission Statement</label>
            <textarea
              {...register("missionStatement", {
                required: "Mission statement is required",
              })}
              placeholder="Describe your organization's mission"
              className="textarea textarea-bordered w-full min-h-[100px]"
            ></textarea>
            {errors.missionStatement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.missionStatement.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Pay $25 & Submit Request
          </button>
        </form>
      )}

      {/* Payment Modal */}
      {showModal && formData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">
              Complete Your Payment
            </h3>
            <CheckoutWrapper
              formData={formData}
              onClose={() => setShowModal(false)}
              user={user}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCharityRole;
