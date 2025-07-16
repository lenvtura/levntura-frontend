import Link from "next/link";

import { Navlinks } from "@/constants/navlinks";
import { GoogleEventsWrapper } from "@/wrappers/google-events-wrapper";

export function NavLinks() {
  return Navlinks.map((link) => (
    <GoogleEventsWrapper
      key={link.label()}
      action={`${link.label()} - CLicked`}
      category="NavBar"
      label={link.label()}
    >
      <Link
        className="uppercase text-white hover:text-lev-yellow whitespace-nowrap"
        href={link.path}
      >
        {link.label()}
      </Link>
    </GoogleEventsWrapper>
  ));
}
