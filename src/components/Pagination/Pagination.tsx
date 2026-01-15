import React from "react";

interface PaginationSectionProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationSectionProps) => {
  return (
    <>
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2">
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-md text-sm font-medium
               border border-neutral-800/40
               bg-neutral-900 text-white
               hover:bg-neutral-800
               disabled:opacity-40 disabled:cursor-not-allowed
               transition-all duration-300 cursor-pointer"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-semibold border transition-all duration-300 cursor-pointer
          ${
            isActive
              ? "bg-neutral-900 text-white border-neutral-900 shadow-md scale-105"
              : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
          }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-md text-sm font-medium
               border border-neutral-800/40
               bg-neutral-900 text-white
               hover:bg-neutral-800
               disabled:opacity-40 disabled:cursor-not-allowed
               transition-all duration-300 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
