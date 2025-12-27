import Link from "next/link";

import { Routes } from "@/constants/routes";
import { Button, type ButtonProps } from "@/design-system/button";

export function StartNowBtn({
  children = "Start now!",
  ...props
}: ButtonProps) {
  return (
    <Button {...props}>
      <Link href={Routes.contact}>{children}</Link>
    </Button>
  );
}
