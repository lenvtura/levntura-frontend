"use client";

import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/design-system/helpers";

interface FooterLinkItem {
  key: string;
  label: string;
  href: string;
}

function FooterLink({ link }: { link: FooterLinkItem }) {
  const pathname = usePathname();
  const isActive = new RegExp(`^${link.href}$`).test(pathname);

  return (
    <Link
      className={cn("hover:text-lev-yellow", isActive && "text-lev-yellow")}
      href={link.href}
    >
      {link.label}
    </Link>
  );
}

export function FooterLinks({ items }: { items?: FooterLinkItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-col gap-2 w-max">
      {items.map((link) => (
        <FooterLink key={link.key} link={link} />
      ))}
    </div>
  );
}
