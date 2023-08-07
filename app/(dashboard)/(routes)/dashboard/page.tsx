"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code2,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code2,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="">
      <div className="mb-8 space-y-4">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          Explore the power of AI
        </h2>
        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">
          Yet another SaaS app trying to make money using OpenAI and a pretty
          frontend
        </p>
      </div>

      <div className="space-y-4 px-4 md:px-20 lg:px-32">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="flex cursor-pointer items-center justify-between border-black/5 p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                <tool.icon className={cn("h-8 w-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
