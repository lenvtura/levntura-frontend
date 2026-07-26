"use client";

import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/design-system/helpers";
import { GoogleEventsWrapper } from "@/wrappers/google-events-wrapper";
import type { Locale } from "@/lib/types";

interface ResolvedNavItem {
  key: string;
  label: string;
  href: string;
  openInNewTab: boolean;
}

interface HeaderNavLinksProps {
  items: ResolvedNavItem[];
  locale: Locale;
}

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNavLinks({ items }: HeaderNavLinksProps) {
  const pathname = usePathname();

  return items.map((item) => {
    const active = isNavActive(pathname, item.href);

    return (
      <GoogleEventsWrapper
        key={item.key}
        action={`${item.label} - Clicked`}
        category="NavBar"
        label={item.label}
      >
        <Link
          className={cn(
            "flex h-10 items-center justify-center whitespace-nowrap rounded-full px-3 text-base font-medium uppercase tracking-[-0.064px] transition-colors",
            active
              ? "bg-lev-blue-highlighter text-lev-blue"
              : "text-[#333] hover:text-lev-blue",
          )}
          href={item.href}
          target={item.openInNewTab ? "_blank" : undefined}
          rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {item.label}
        </Link>
      </GoogleEventsWrapper>
    );
  });
}
