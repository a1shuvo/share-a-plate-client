import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const PaymentForm = ({ formData, user, refetch, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // Create PaymentIntent
      const res = await axiosSecure.post("/payments/create-payment-intent", {
        amount: 2500,
        email: user.email,
      });

      const { clientSecret, transactionId } = res.data;

      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: user.displayName,
              email: user.email,
            },
          },
        }
      );

      if (error) throw new Error(error.message);
      if (paymentIntent.status !== "succeeded")
        throw new Error("Payment did not succeed.");

      // Save role request
      await axiosSecure.post("/role-requests", {
        email: user.email,
        name: user.displayName,
        organizationName: formData.organizationName,
        missionStatement: formData.missionStatement,
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

      // ✅ Refetch to show new role status
      if (refetch) refetch();
      if (onClose) onClose(); // Close modal

      Swal.fire("Success", "Charity role requested successfully.", "success");
    } catch (err) {
      Swal.fire("Payment Failed", err.message, "error");
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement className="border p-2 rounded" />
      <button className="btn btn-primary mt-4" type="submit">
        Pay $25 & Submit
      </button>
    </form>
  );
};

export default PaymentForm;
