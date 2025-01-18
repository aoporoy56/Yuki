import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; 

// Load your Stripe public key
const stripePromise = loadStripe("pk_test_51PKhjU2NL83gbkI8cH0g5Lh9Zh3rOFa0YR3JI6Xx6SVWR8XrZWpIXFOZbBf820HDwFWl7ey6addfavnlMR9Nht7b003mDtllqB");

const Payment = () => {
  return (
    <div className="mx-auto max-w-lg mt-8">
      <h1 className="text-center font-semibold text-2xl mb-4">Complete Your Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
