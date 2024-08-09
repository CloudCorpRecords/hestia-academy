'use client'
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function CheckoutForm() {

  const [loading, setLoading] = useState();

  async function createCheckoutSession(){
    
    try {
        setLoading(true)
        // Create PaymentIntent as soon as the page loads
        const response = await fetch("/api/stripe/checkout-sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [
                {
                  // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                  price: "price_1PlgLJLIAaAYQthIknkqynh8",
                  quantity: 1,
                },
            ]}),
        });
        const session = await response.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: session.id });
        setLoading(false)
    } catch (error) {
      setLoading(false)
        console.error(error.message)
    }
    
  }

  return (
    <div className="checkout-form">
      <button className="bg-indigo-600 text-white rounded px-6 py-2" onClick={()=>createCheckoutSession()}>Subscribe to premium content</button>
    </div>
  );
}