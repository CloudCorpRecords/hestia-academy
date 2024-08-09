import Stripe from "stripe";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  try {

    const user = await currentUser();
    if(!user || !user.publicMetadata.stripeCustomerId){
        console.error('no user found in clerk webhook route: ',user)
        return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    const origin = req.headers.get("origin");
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      customer: user.publicMetadata.stripeCustomerId,
      //ui_mode: "embedded",
      billing_address_collection: 'auto',
      line_items: items,
      mode: "subscription",
      success_url: `${origin}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (err) {
    console.error("Error retrieving checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
