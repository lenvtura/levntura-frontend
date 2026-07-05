"use client";

import { usePathname } from "next/navigation";
import { Routes } from "@/constants/routes";
import { cn } from "@/design-system/helpers";

const bgColorMapper = (pathname: string) =>
  new Map([
    [pathname.includes(Routes.home), "bg-lev-blue"],
    [pathname.includes(Routes.about), "bg-lev-orange"],
    [pathname.includes(Routes.blogs), "bg-lev-red"],
    [pathname.includes(Routes.careers), "bg-lev-green-dark"],
    [pathname.includes(Routes.contact), "bg-lev-blue-light"],
    [pathname.includes(Routes.programs), "bg-lev-green-dark"],
    [pathname.includes(Routes.gallery), "bg-lev-red"],
  ]);

export function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const color = bgColorMapper(pathname).get(true);

  return <div className={cn("bg-lev-green-dark", color)}>{children}</div>;
}
