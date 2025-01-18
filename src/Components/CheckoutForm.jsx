import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [trxId, setTrxId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    console.log("Order Details:", orderDetails);

    const totalAmount = Math.round(Number(orderDetails.total) * 100); // convert to cents and round

    console.log("Total Amount (cents):", totalAmount);

    if (isNaN(totalAmount) || totalAmount <= 0) {
      console.error("Invalid total amount");
      setIsProcessing(false);
      return;
    }

    const response = await fetch(
      "https://yuki-server.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create PaymentIntent:", errorData);
      setIsProcessing(false);
      return;
    }

    const { clientSecret } = await response.json();

    if (!clientSecret) {
      console.error("Missing clientSecret from server response");
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: elements.getElement(CardElement) },
      }
    );

    console.log("Payment Intent:", paymentIntent);

    if (error) {
      console.error("Payment failed:", error.message);
      setIsProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        const transactionId = paymentIntent.id;
        setTrxId(transactionId);
        setPaymentSuccess(true);
        const totalAmount = paymentIntent.amount;
        const amount =
          typeof totalAmount === "number" && !isNaN(totalAmount)
            ? totalAmount / 100
            : 0;

        try {
          // Save payment details to Firestore
          await addDoc(collection(db, "payments"), {
            id: transactionId,
            created: new Date(),
            status: paymentIntent.status,
            amount: amount,
          });
        } catch (e) {
          console.error("Error adding payment details: ", e);
        }
      }
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded-lg mt-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
      <CardElement
        className="border p-2 rounded mt-4"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              letterSpacing: "0.5px",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
          },
        }}
      />
      

      <div className="flex justify-end">
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:to-blue-700 text-white px-4 py-2 rounded"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      </div>
      <p className="text-red-500 mt-4">{}</p>
      {paymentSuccess && (
        <p className="text-green-600 mb-1 font-medium">
          Payment was successful!
        </p>
      )}
      {trxId && (
        <p className="text-green-600 mb-1 font-medium">Trx id: {trxId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
