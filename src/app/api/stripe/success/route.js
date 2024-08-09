import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });

export async function GET(req) {
    const user = await currentUser();
    if(!user){
        console.error('no user found in stripe success route: ',user)
        return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    try {
      const { searchParams } = new URL(req.url);
      const sessionId = searchParams.get("session_id");
      const clerkId = searchParams.get("clerk_id");

      if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
      }
  
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("Session data:", session);
    
      if (!clerkId) {
        console.error("⚠️  Clerk user ID is missing from session metadata.");
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      )
  
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
      NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (err) {
      console.error("Error retrieving checkout session:", err);
      return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
    }
  }
  