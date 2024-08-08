import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id"),
    "svix-timestamp": req.headers.get("svix-timestamp"),
    "svix-signature": req.headers.get("svix-signature"),
  };

  let event;

  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(body, svixHeaders);
  } catch (err) {
    console.log(`⚠️  Clerk Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log("Received event:", event);

  if (event.type === "user.created") {
    const user = event.data;
    const email = user.email_addresses[0].email_address;

    try {
      // Search for an existing Stripe customer with the same email
      const existingCustomers = await stripe.customers.list({
        email,
        limit: 1, // Limit to one result for efficiency
      });

      let stripeCustomerId;

      if (existingCustomers.data.length > 0) {
        // Customer exists, use the existing customer ID
        stripeCustomerId = existingCustomers.data[0].id;
        console.log(`Existing Stripe customer found: ${stripeCustomerId}`);
      } else {
        // Customer does not exist, create a new one
        const stripeCustomer = await stripe.customers.create({
          email,
          metadata: {
            clerkId: user.id,
          },
        });
        stripeCustomerId = stripeCustomer.id;
        console.log(`New Stripe customer created: ${stripeCustomerId}`);
      }

      // Update Clerk user with the Stripe customer ID
      await clerkClient.users.updateUser(user.id, {
        publicMetadata: {
          premium: "no",
          stripeCustomerId,
        },
      });

      console.log(`User ${user.id} metadata updated with premium: no and stripeCustomerId: ${stripeCustomerId}`);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
      console.error(`Failed to create or retrieve Stripe customer or update user metadata: ${err.message}`);
      return NextResponse.json(
        { error: `Failed to create or retrieve Stripe customer or update user metadata: ${err.message}` },
        { status: 500 }
      );
    }
  } else {
    // We don't have a handler for this event yet, so return success
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
