import Image from "next/image";

export function Loader({ text }: { text?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-16 w-16 animate-ping">
        <Image alt="logo" fill src="/brain-loading.png" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {text ? text : "Brainbox is thinking..."}
      </p>
    </div>
  );
}
