'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
  } from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    async function createCheckoutSession(){
        try {
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
            const data = await response.json();
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.error(error.message)
        }
        
    }
    createCheckoutSession()

  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div className="checkout-form">
      {clientSecret && (
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
        >
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}