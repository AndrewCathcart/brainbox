"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function LandingNavbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-transparent p-4">
      <Link href={"/"} className="flex items-center">
        <div className="relative mr-4 h-8 w-48">
          <Image fill alt="Logo" src="/logo-color.png" />
        </div>
      </Link>
      <div className="flex items-center gap-x-2 ">
        <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
