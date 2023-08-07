import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // go to billing portal if they have a subscription
    if (subscription && subscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // create a checkout session if they don't have a subscription
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Brainbox Pro",
              description: "Unlimited AI Generation",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
