import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import openai from "@/lib/openai";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ResponseTypes } from "openai-edge";

export const runtime = "edge";

const initialPrompt = {
  role: "system",
  content:
    "You are a senior software engineer tasked with helping me write great code. You must answer only in markdown code snippets. Use code comments for explanations.",
};

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

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [initialPrompt, ...messages],
    });

    const data = (await res.json()) as ResponseTypes["createChatCompletion"];

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
