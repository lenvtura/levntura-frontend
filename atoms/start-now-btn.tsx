import Link from "next/link";

import { Routes } from "@/constants/routes";
import { Button, type ButtonProps } from "@/design-system/button";

export function StartNowBtn(props: ButtonProps) {
  return (
    <Button {...props}>
      <Link href={Routes.contact}>Start now!</Link>
    </Button>
  );
}
