import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutWrapper = ({ formData, user, refetch, onClose }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm
      formData={formData}
      user={user}
      refetch={refetch}
      onClose={onClose}
    />
  </Elements>
);

export default CheckoutWrapper;
