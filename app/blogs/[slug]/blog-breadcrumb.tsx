import { FadeUpAnimator } from "@/atoms/fade-up-animator";
import Link from "next/link";
import React from "react";

export function BlogBreadcrumb({ breadcrumbs }: { breadcrumbs: string[] }) {
  return (
    <FadeUpAnimator transition={{ delay: 0.1 }}>
      <div className="flex items-center gap-2 text-lev-gray text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={index}>
            {index > 0 && <span className="mx-2">/</span>}
            <Link
              href={index === 0 ? "/" : "#"}
              className="hover:text-lev-blue-dark transition-colors"
            >
              {crumb}
            </Link>
          </span>
        ))}
      </div>
    </FadeUpAnimator>
  );
}
