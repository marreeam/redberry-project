"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
  const pageNumbers: (number | string)[] = [];
  const lastPagesCount = 2;
  const windowCount = 2; // pages to show in sliding window

  // sliding pages from current
  for (let i = currentPage; i < currentPage + windowCount && i <= lastPage - lastPagesCount; i++) {
    pageNumbers.push(i);
  }

  // dots if there is a gap
  if (currentPage + windowCount < lastPage - lastPagesCount + 1) {
    pageNumbers.push("...");
  }

  // last two pages
  for (let i = lastPage - lastPagesCount + 1; i <= lastPage; i++) {
    if (i > 0 && !pageNumbers.includes(i)) pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="px-3 py-1 rounded font-medium leading-[20px] font-poppins text-center border border-[#F8F6F7]"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 border border-[#F8F6F7] text-[#212B36] rounded font-medium leading-[20px] font-poppins text-center ${
              page === currentPage ? "border-[#FF4000] text-[#FF4000] font-semibold" : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
        disabled={currentPage === lastPage}
        className="p-2 rounded disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
