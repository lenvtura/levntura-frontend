import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import Link from "next/link";
import React from "react";

export function BlogBreadcrumb({ title }: { title: string }) {
  return (
    <FadeUpAnimator transition={{ delay: 0.1 }}>
      <div className="flex items-center gap-2 text-lev-gray text-sm">
        <Link href={"/"} className="hover:text-lev-blue-dark transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={"/blogs"}
          className="hover:text-lev-blue-dark transition-colors"
        >
          Blogs
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </div>
    </FadeUpAnimator>
  );
}
