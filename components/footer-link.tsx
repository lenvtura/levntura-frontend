"use client";

import { Navlinks } from "@/constants/navlinks";
import { cn } from "@/design-system/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

function FooterLink({ link }: { link: { label(): string; path: string } }) {
  const pathname = usePathname();
  const isActive = new RegExp(`^${link.path}$`).test(pathname);

  return (
    <Link
      key={link.label()}
      className={cn("hover:text-lev-yellow", isActive && "text-lev-yellow")}
      href={link.path}
    >
      {link.label()}
    </Link>
  );
}

export function FooterLinks() {
  return (
    <div className="flex flex-col gap-2 w-max">
      {Navlinks.map((link) => {
        return <FooterLink key={link.path} link={link} />;
      })}
    </div>
  );
}
