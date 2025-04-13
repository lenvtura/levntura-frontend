import Link from "next/link";

import { Navlinks } from "@/constants/navlinks";

export function NavLinks() {
  return Navlinks.map((link) => (
    <Link
      key={link.label()}
      className="uppercase text-white hover:text-lev-yellow whitespace-nowrap"
      href={link.path}
    >
      {link.label()}
    </Link>
  ));
}
