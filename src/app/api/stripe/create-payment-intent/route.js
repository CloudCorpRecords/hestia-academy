import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Function to calculate order amount
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400; // Example fixed amount
};

// Handler for the POST request to create a PaymentIntent
export async function POST(req) {
  try {

    const user = await currentUser();
    if(!user || !user.publicMetadata.stripeCustomerId){
        console.error('no user found in clerk webhook route: ',user)
        return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }

    const { items } = await req.json();

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        customer: user.publicMetadata.stripeCustomerId,
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    // Return the client secret in the response
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json(
      { error: "Failed to create PaymentIntent" },
      { status: 500 }
    );
  }
}
