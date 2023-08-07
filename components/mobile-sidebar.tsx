"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function MobileSidebar({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size="icon" className="h-8 w-8 md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 text-white">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
}
