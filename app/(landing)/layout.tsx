import React from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full overflow-auto bg-[#111827]">
      <div className="mx-auto h-full max-w-screen-xl">{children}</div>
    </main>
  );
}
