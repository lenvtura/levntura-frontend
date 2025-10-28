import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { LevunturaFullLogo } from "@/atoms/logo";
import { NavLinks } from "@/atoms/nav-links";
import { StartNowBtn } from "@/atoms/start-now-btn";

import { HEADER_HEIGHT } from "@/constants/header-height";
import { Routes } from "@/constants/routes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/design-system/sheet";
import { Navlinks } from "@/constants/navlinks";

export function Header() {
  return (
    <div
      style={{ height: HEADER_HEIGHT }}
      className="container bg-transparent mix-blend-difference z-[900] fixed left-1/2 -translate-x-1/2 top-0 flex justify-between items-center"
    >
      <Link href={Routes.home} className="text-white max-w-[160px] shrink-0">
        <LevunturaFullLogo />
      </Link>

      <div className="max-xl:hidden-with-animate block-with-animate transition-all duration-1000 flex justify-center items-center gap-12">
        <NavLinks />
      </div>

      <div className="max-xl:hidden-with-animate  block-with-animate transition-all duration-1000">
        <StartNowBtn className="border-white text-white" />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon className="xl:hidden-with-animate text-white block-with-animate transition-all duration-1000 shrink-0" />
        </SheetTrigger>
        <SheetContent className="z-999 w-full ">
          <SheetHeader>
            <div className="max-w-[160px]">
              <LevunturaFullLogo />
            </div>
          </SheetHeader>
          <div className="flex flex-col p-4 typography-S18">
            {Navlinks.map((link) => {
              return (
                <SheetClose asChild key={link.label()}>
                  <Link
                    className="hover:bg-lev-gray-light px-2 py-4"
                    href={link.path}
                  >
                    {link.label()}
                  </Link>
                </SheetClose>
              );
            })}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <StartNowBtn size={"lg"} />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
