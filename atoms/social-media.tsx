import Link from "next/link";

import { Button } from "@/design-system/button";

import { TwitterIcon } from "lucide-react";
import { FacebookIcon } from "@/assets/icons/facebook";

export const SocialMediaLinks = [
  { id: 1, path: "/asaa", icon: <TwitterIcon fill="white" /> },
  {
    id: 2,
    path: "https://www.facebook.com/share/1ABHriXpTc/",
    icon: <FacebookIcon />,
  },
];

export function SocialMedia() {
  return SocialMediaLinks.map((link) => (
    <Button key={link.id} asChild size={"icon-sm"} className="border-white">
      <Link className="uppercase whitespace-nowrap" href={link.path}>
        {link.icon}
      </Link>
    </Button>
  ));
}
