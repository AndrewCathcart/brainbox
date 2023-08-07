import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export const runtime = "edge";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

// We should probably listen to the success webhook here in future
// as cold starts from replicate can take a very long time
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { prompt } = body;
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!process.env.REPLICATE_API_KEY) {
      return new NextResponse("Replicate API Key not configured", {
        status: 500,
      });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const res = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      },
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(res);
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
