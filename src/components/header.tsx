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
import { getTranslations } from "next-intl/server";

const headerCtaClassName =
  "border-0 bg-lev-blue text-white hover:bg-lev-blue-dark hover:text-white h-12 px-4 rounded-full normal-case";

export async function Header() {
  const locale = await resolveLocale();
  const t = await getTranslations("common");

  const header = await getHeader(locale);
  const navItems = resolveNav(header, locale);
  const cta = header?.cta;
  const ctaLabel = cta?.enabled ? cta.label : undefined;
  const ctaHref = cta?.enabled ? cta.url : undefined;

  // Locale-agnostic — the locale-aware <Link> adds the `/ar` prefix.
  const homeHref = Routes.home;

  const ctaButton =
    ctaLabel && ctaHref ? (
      <StartNowBtn className={headerCtaClassName} href={ctaHref}>
        {ctaLabel}
      </StartNowBtn>
    ) : (
      <StartNowBtn className={headerCtaClassName} />
    );

  return (
    <header
      style={{ height: HEADER_HEIGHT }}
      className="pointer-events-none fixed inset-x-0 top-0 z-100000 flex justify-center pt-4"
    >
      <div className="pointer-events-auto relative flex h-20 w-[calc(100%-2rem)] max-w-[1224px] items-center justify-between overflow-clip rounded-full bg-white px-6 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <Link
          href={homeHref}
          className="relative z-10 block h-[42px] w-[180px] shrink-0 text-lev-black max-md:w-[140px]"
        >
          <LevunturaFullLogo className="h-full w-full" />
        </Link>

        <div className="max-xl:hidden-with-animate absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6 px-1 py-2">
          <HeaderNavLinks items={navItems} locale={locale} />
        </div>

        <div className="max-xl:hidden-with-animate relative z-10 flex shrink-0 items-center justify-end gap-3">
          <LocaleToggle className="text-lev-black" />
          {ctaButton}
        </div>

        <div className="xl:hidden-with-animate relative z-10 flex items-center gap-2">
          <LocaleToggle className="text-lev-black" />
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full text-lev-black"
                aria-label={t("navigationMenu")}
              >
                <MenuIcon className="size-6" suppressHydrationWarning />
              </button>
            </SheetTrigger>
            <SheetContent className="z-999 w-full bg-white">
              <SheetTitle className="sr-only">{t("navigationMenu")}</SheetTitle>
              <SheetHeader>
                <Link
                  href={homeHref}
                  className="block max-w-[160px] text-lev-black"
                >
                  <LevunturaFullLogo />
                </Link>
              </SheetHeader>
              <div className="flex flex-col p-4 typography-S18 text-lev-black">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      className="rounded-full px-3 py-4 uppercase hover:bg-lev-blue-highlighter hover:text-lev-blue"
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={
                        item.openInNewTab ? "noopener noreferrer" : undefined
                      }
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
                    <StartNowBtn
                      size="lg"
                      className={headerCtaClassName}
                      href={ctaHref}
                    >
                      {ctaLabel}
                    </StartNowBtn>
                  ) : (
                    <StartNowBtn size="lg" className={headerCtaClassName} />
                  )}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
