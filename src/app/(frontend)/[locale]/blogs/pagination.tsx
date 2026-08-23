"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/design-system/helpers";
import { FadeUpAnimator } from "@/atoms/fade-up-animator";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="container py-12">
      <FadeUpAnimator>
        <div className="flex items-center justify-center gap-4">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="typography-R18 text-lev-gray">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "typography-R18 min-w-[40px] h-[40px] flex items-center justify-center transition-colors",
                  currentPage === page
                    ? "text-lev-red font-bold"
                    : "text-lev-black hover:text-lev-red"
                )}
              >
                {page}
              </button>
            );
          })}
          
          {currentPage < totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="ml-2 text-lev-red hover:text-lev-red/80 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </FadeUpAnimator>
    </div>
  );
}






