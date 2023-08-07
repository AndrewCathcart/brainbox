import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return (
    <div className="">
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-grey-700"
        bgColor="bg-gray-700/10"
      />
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isPro
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
