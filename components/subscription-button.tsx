"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export default function SubscriptionButton({
  isPro = false,
}: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stripe");
      const data = await res.json();

      window.location.href = data?.url;
    } catch (error) {
      console.log("[BILLING_ERROR]", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "upgrade"}
      onClick={handleClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
}
