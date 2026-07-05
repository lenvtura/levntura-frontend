import { MenuIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { LevunturaFullLogo } from "@/atoms/logo";
import { StartNowBtn } from "@/atoms/start-now-btn";
import { LocaleToggle } from "@/components/locale-toggle";

import { HEADER_HEIGHT } from "@/constants/header-height";
import { Routes } from "@/constants/routes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/sheet";

import { getHeader } from "@/lib/api";
import { resolveNav } from "@/lib/nav";
import { resolveLocale } from "@/lib/server-request";

import { HeaderNavLinks } from "@/atoms/nav-links";

export async function Header() {
  const locale = await resolveLocale();

  const header = await getHeader(locale);
  const navItems = resolveNav(header, locale);
  const cta = header?.cta;
  const ctaLabel = cta?.enabled ? cta.label : undefined;
  const ctaHref = cta?.enabled ? cta.url : undefined;

  // Locale-agnostic — the locale-aware <Link> adds the `/ar` prefix.
  const homeHref = Routes.home;

  return (
    <div
      style={{ height: HEADER_HEIGHT }}
      className="container bg-transparent mix-blend-difference z-100000 fixed left-1/2 -translate-x-1/2 top-0 flex justify-between items-center"
    >
      <Link href={homeHref} className="text-white max-w-[160px] shrink-0">
        <LevunturaFullLogo />
      </Link>

      <div className="max-xl:hidden-with-animate block-with-animate transition-all duration-1000 flex justify-center items-center gap-12">
        <HeaderNavLinks items={navItems} locale={locale} />
      </div>

      <div className="max-xl:hidden-with-animate block-with-animate transition-all duration-1000 flex items-center gap-4">
        <LocaleToggle />
        {ctaLabel && ctaHref ? (
          <StartNowBtn className="border-white text-white" href={ctaHref}>
            {ctaLabel}
          </StartNowBtn>
        ) : (
          <StartNowBtn className="border-white text-white" />
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon
            className="xl:hidden-with-animate text-white block-with-animate transition-all duration-1000 shrink-0"
            suppressHydrationWarning
          />
        </SheetTrigger>
        <SheetContent className="z-999 w-full ">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetHeader>
            <Link href={homeHref} className="max-w-[160px] block">
              <LevunturaFullLogo />
            </Link>
          </SheetHeader>
          <div className="flex flex-col p-4 typography-S18">
            {navItems.map((item) => (
              <SheetClose asChild key={item.key}>
                <Link
                  className="hover:bg-lev-gray-light px-2 py-4"
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>
          <SheetFooter>
            <div className="flex justify-center pb-2">
              <LocaleToggle className="text-lev-black" />
            </div>
            <SheetClose asChild>
              {ctaLabel && ctaHref ? (
                <StartNowBtn size={"lg"} href={ctaHref}>
                  {ctaLabel}
                </StartNowBtn>
              ) : (
                <StartNowBtn size={"lg"} />
              )}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
