import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const initialPrompt: ChatCompletionRequestMessage = {
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

    if (!config.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
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

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(res.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
