import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const RequestCharityRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if user already has a request
  const { data: existingRequest } = useQuery({
    queryKey: ["roleRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/role-requests/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const onSubmit = async (data) => {
    if (
      existingRequest?.status === "Pending" ||
      existingRequest?.status === "Approved"
    ) {
      return Swal.fire({
        icon: "info",
        title: "Request Exists",
        text: `You already have a ${existingRequest.status} request.`,
        timer: 1800,
        showConfirmButton: false,
      });
    }

    try {
      setProcessing(true);

      // Simulated Stripe payment (replace with Stripe Elements in real)
      const payment = await axiosSecure.post("/create-payment-intent", {
        amount: 2500,
        email: user.email,
      });

      const transactionId = payment.data.transactionId;

      // Save role request
      await axiosSecure.post("/role-requests", {
        email: user.email,
        name: user.displayName,
        organizationName: data.organizationName,
        missionStatement: data.missionStatement,
        transactionId,
        status: "Pending",
      });

      // Save transaction
      await axiosSecure.post("/transactions", {
        transactionId,
        amount: 2500,
        date: new Date(),
        email: user.email,
        purpose: "Charity Role Request",
        status: "Pending",
      });

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Your request is now pending admin approval.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Payment Failed", err.message, "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Request Charity Role</h2>

      {existingRequest?.status === "Pending" ||
      existingRequest?.status === "Approved" ? (
        <p className="bg-gray-100 p-4 text-center rounded">
          You already have a <strong>{existingRequest.status}</strong> role
          request.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name - readonly */}
          <input
            className="input input-bordered w-full"
            value={user?.displayName}
            readOnly
          />

          {/* Email - readonly */}
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

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={processing}
          >
            {processing ? "Processing..." : "Pay $25 & Request"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestCharityRole;
