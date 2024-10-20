import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q5PQ5RriQFy8QgNx1vb4HOY9l1f3o8uduqmBFWGh0Nq7JQJQcU1hTuvahkwFlS0HB0ZnOESjlq0YapdUm4w8hdn008DuMtvKL');

const PaymentPage = ({ pricePerItem }) => {
    const [sessionId, setSessionId] = useState(null);
  
    useEffect(() => {
      const priceInCents = Math.round(pricePerItem );
      // Call backend to create checkout session
      fetch('http://127.0.0.1:8000/api/create-checkout-session/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price_per_item: priceInCents }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Checkout session response:", data); // Log the response
          if (data.id) {
            setSessionId(data.id);
          } else {
            console.error("Session ID not found in response:", data);
          }
        })
        .catch((error) => console.error("Error creating checkout session:", error));
    }, [pricePerItem]);
  
    const handleCheckout = async () => {
      if (!sessionId) {
        console.error("Session ID is not available.");
        return;
      }
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    };
  
    return (
      <div>
        
        {/* <button onClick={handleCheckout}>Checkout with Stripe</button> */}
        {sessionId ? (
      <button variant="outline-warning"
      className="rounded-5  w-100 text-dark bg-warning text-center  ml-5  fs-3 p-3" onClick={handleCheckout} >Checkout</button>
    ) : (
      <p>Loading checkout session...</p>
    )}
      </div>
    );
};

export default PaymentPage;

