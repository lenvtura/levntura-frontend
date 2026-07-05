"use client";

import { Button } from "@/design-system/button";
import { MoveRightIcon } from "lucide-react";
import React, { ComponentProps } from "react";
import { cn } from "@/design-system/helpers";
import { Link } from "@/i18n/navigation";

export function ButtonWithArrow({
  children,
  className,
  iconClassName,
  href,
  ...props
}: { iconClassName?: string; children: React.ReactNode } & ComponentProps<
  typeof Link
>) {
  // The locale-aware <Link> auto-prefixes internal hrefs with `/ar`.
  return (
    <Link
      className={cn(
        " max-md:-mt-2 inline-flex group typography-R18 items-center gap-4",
        className
      )}
      href={href}
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
