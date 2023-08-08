import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) return false;

  const subscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!subscription) return false;

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! > Date.now();

  return !!isValid;
};
