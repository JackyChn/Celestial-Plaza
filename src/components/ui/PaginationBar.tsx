"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage, // currentPage is 1 initially
  totalPages,
}: PaginationBarProps) {
  const searchParams = useSearchParams();

  // set url with searchParams, such as ?page=...
  function getLink(page: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    // page starts from 1
    newSearchParams.set("page", page.toString());
    return `?${newSearchParams.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            href={getLink(currentPage - 1)}
            className={cn(
              // if the currentPage is 1 then muted the text (disabled)
              currentPage === 1 && "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isEdgePage = page === 1 || page === totalPages;
          const isNearCurrentPage = Math.abs(page - currentPage) <= 2;

          if (!isEdgePage && !isNearCurrentPage) {
            if (i === 1 || i === totalPages - 2) {
              return (
                <PaginationItem key={page} className="hidden md:block">
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }
            return null;
          }
          return (
            <PaginationItem
              key={page}
              className={cn(
                "hidden md:block",
                page === currentPage && "pointer-events-none block",
              )}
            >
              <PaginationLink
                href={getLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href={getLink(currentPage + 1)}
            className={cn(
              // if the currentPage is >= the totalPages then muted the text (disabled)
              currentPage >= totalPages &&
                "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
