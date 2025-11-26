import { Button } from "@/design-system/button";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import React, { ComponentProps } from "react";
import { cn } from "@/design-system/helpers";

export function ButtonWithArrow({
  children,
  className,
  iconClassName,
  ...props
}: { iconClassName?: string; children: React.ReactNode } & ComponentProps<
  typeof Link
>) {
  return (
    <Link
      className={cn(
        " max-md:-mt-2 inline-flex group typography-R18 items-center gap-4",
        className
      )}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
      <Button
        className={cn(
          "border-white group-hover:translate-x-2 transition-transform duration-300",
          iconClassName
        )}
        size="icon-md"
      >
        <MoveRightIcon />
      </Button>
    </Link>
  );
}
