import { Link } from "@/i18n/navigation";

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

export function HeaderNavLinks({ items }: HeaderNavLinksProps) {
  return items.map((item) => (
    <GoogleEventsWrapper
      key={item.key}
      action={`${item.label} - Clicked`}
      category="NavBar"
      label={item.label}
    >
      <Link
        className="uppercase text-white hover:text-lev-yellow whitespace-nowrap"
        href={item.href}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {item.label}
      </Link>
    </GoogleEventsWrapper>
  ));
}
