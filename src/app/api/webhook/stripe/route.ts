import { buffer } from "micro";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const buf = await buffer(req);
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("⚠️  Stripe Webhook signature header is missing.");
    return NextResponse.json(
      { error: "Webhook Error: Stripe-signature header is missing." },
      { status: 400 },
    );
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log("Stripe event:", stripeEvent);
  } catch (err: any) {
    console.error(
      `⚠️  Stripe Webhook signature verification failed: ${err.message}`,
    );
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  if (stripeEvent && stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    console.log("Session data:", session);

    const clerkId = session.metadata.clerkId; // Get Clerk user ID from metadata

    if (!clerkId) {
      console.error("⚠️  Clerk user ID is missing from session metadata.");
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const stripeCustomerId = session.customer as string;

    try {
      // Update Clerk user with the new metadata
      await clerkClient.users.updateUser(clerkId, {
        publicMetadata: {
          premium: "yes",
          stripeCustomerId: stripeCustomerId, // Save the Stripe customer ID
        },
      });

      console.log(
        `User ${clerkId} metadata updated with premium: 'yes' and stripeCustomerId: ${stripeCustomerId}`,
      );
    } catch (err: any) {
      console.error(`Failed to update user metadata: ${err.message}`);
      return NextResponse.json(
        { error: `Failed to update user metadata: ${err.message}` },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
