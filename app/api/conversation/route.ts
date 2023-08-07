import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    // api clients don't seem to work in edge funcs, make our own using fetch
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    const data = await res.json();

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(data["choices"][0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
