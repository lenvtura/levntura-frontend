import { cn } from "@/design-system/helpers";
import type { ComponentProps } from "react";

export function SectionTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "typography-EB74 text-lev-blue-dark uppercase max-sm:typography-EB48",
        className
      )}
      {...props}
    />
  );
}
