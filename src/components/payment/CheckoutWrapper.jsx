import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutWrapper = ({ formData }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm formData={formData} />
  </Elements>
);

export default CheckoutWrapper;
