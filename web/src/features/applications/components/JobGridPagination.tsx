import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface JobGridPaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalFilteredCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export const JobGridPagination: React.FC<JobGridPaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalFilteredCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const startRange = totalFilteredCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRange = Math.min(currentPage * rowsPerPage, totalFilteredCount);

  return (
    <div className="p-3 bg-[#f4f4f4] border-t border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#525252]">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span>Items per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="h-7 px-1.5 bg-white border border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <span className="font-['IBM_Plex_Mono']">
          {totalFilteredCount === 0
            ? '0 - 0 of 0 items'
            : `${startRange} - ${endRange} of ${totalFilteredCount} items`}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="font-['IBM_Plex_Mono']">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex border border-[#8d8d8d] bg-white">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="p-1.5 hover:bg-[#e0e0e0] disabled:opacity-40 disabled:hover:bg-white border-r border-[#8d8d8d]"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="p-1.5 hover:bg-[#e0e0e0] disabled:opacity-40 disabled:hover:bg-white"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
