import CrispProvider from "@/components/crisp-provider";
import { ModalProvider } from "@/components/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brainbox",
  description: "Another AI SaaS app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
