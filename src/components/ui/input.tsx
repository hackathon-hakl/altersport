import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-md bg-[#c7c9e14d] px-4 py-1 text-base text-white shadow-xs transition-[color,box-shadow] outline-none selection:bg-[#c7c9e14d] selection:text-white file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium file:text-white placeholder:text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-[#c7c9e14d]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
