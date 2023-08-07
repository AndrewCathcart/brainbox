"use client";

import BotAvatar from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import Heading from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";

export default function ConversationPage() {
  const proModal = useProModal();
  const { toast } = useToast();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const latestMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, latestMessage];

      const res = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, latestMessage, res.data]);
      form.reset();
    } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 403) {
        return proModal.onOpen();
      }
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ask me a question..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="flex w-full items-center justify-center rounded-lg bg-muted p-8">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((msg) => (
              <div
                key={msg.content}
                className={cn(
                  "flex w-full items-start gap-x-8 rounded-lg p-8",
                  msg.role === "user"
                    ? "border border-black/10 bg-white"
                    : "bg-muted",
                )}
              >
                {msg.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm"> {msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
