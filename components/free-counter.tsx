import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FREE_TIER_USAGE_LIMIT } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function FreeCounter({
  apiLimitCount,
  isPro = false,
}: FreeCounterProps) {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (isPro) return null;

  return (
    <div className="px-3">
      <Card className="border-0 bg-white/10">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-white">
            <p>
              {apiLimitCount} / {FREE_TIER_USAGE_LIMIT} Free Credits
            </p>
            <Progress value={(apiLimitCount / FREE_TIER_USAGE_LIMIT) * 100} />
          </div>
          <Button
            className="w-full"
            variant={"upgrade"}
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="ml-2 h-4 w-4 fill-white"></Zap>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
