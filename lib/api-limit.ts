import { FREE_TIER_USAGE_LIMIT } from "@/constants";
import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
  const { userId } = auth();
  if (!userId) return;

  await prismadb.userApiLimit.upsert({
    where: {
      userId,
    },
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      userId,
      count: 1,
    },
  });
};

export const assertLimit = (
  limit: {
    count: number;
  } | null,
) => {
  return !limit || limit.count < FREE_TIER_USAGE_LIMIT;
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const limit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
    select: {
      count: true,
    },
  });

  return assertLimit(limit);
};

export const getApiLimitCount = async (): Promise<number> => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const limit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
    select: {
      count: true,
    },
  });

  if (!limit) {
    return 0;
  }

  return limit.count;
};
