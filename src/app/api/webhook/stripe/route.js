import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    console.error("⚠️  Stripe Webhook signature header is missing.");
    return NextResponse.json(
      { error: "Webhook Error: Stripe-signature header is missing." },
      { status: 400 },
    );
  }

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    console.log("Stripe event:", stripeEvent);
  } catch (err) {
    console.error(
      `⚠️  Stripe Webhook signature verification failed: ${err.message}`,
    );
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  const session = stripeEvent.data.object;
  const stripeCustomerId = session.customer;
  const clerkId = session.metadata.clerkId; // Get Clerk user ID from metadata
  console.log("Session data:", session);

  if (!clerkId) {
    console.error("⚠️  Clerk user ID is missing from session metadata.");
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  if (stripeEvent && stripeEvent.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    )

    try {
      // Update Clerk user with the new metadata
      await clerkClient.users.updateUser(clerkId, {
        publicMetadata: {
          premium: "yes",
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });

      console.log(
        `User ${clerkId} metadata updated with premium: 'yes' and stripeCustomerId: ${stripeCustomerId}`,
      );
    } catch (err) {
      console.error(`Failed to update user metadata: ${err.message}`);
      return NextResponse.json(
        { error: `Failed to update user metadata: ${err.message}` },
        { status: 500 },
      );
    }
  }

  if (stripeEvent && stripeEvent.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    )

    // Update the price id and set the new period end.
    await clerkClient.users.updateUser(clerkId, {
      publicMetadata: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
