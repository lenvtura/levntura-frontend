"use client";

import { useTranslations } from "next-intl";

import { Routes } from "@/constants/routes";
import { Button, type ButtonProps } from "@/design-system/button";
import { Link } from "@/i18n/navigation";

interface StartNowBtnProps extends ButtonProps {
  href?: string;
}

export function StartNowBtn({
  children,
  href = Routes.contact,
  ...props
}: StartNowBtnProps) {
  const t = useTranslations("common");
  // The locale-aware <Link> auto-prefixes internal hrefs with `/ar` on the
  // Arabic shell, so callers stay locale-agnostic.
  return (
    <Button {...props}>
      <Link href={href}>{children ?? t("startNow")}</Link>
    </Button>
  );
}
