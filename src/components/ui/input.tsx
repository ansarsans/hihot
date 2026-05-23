import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-[#f5f1ea] transition-colors outline-none backdrop-blur-xl file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#f5f1ea]/50 focus-visible:border-[#c2a976]/70 focus-visible:ring-2 focus-visible:ring-[#c2a976]/40 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
