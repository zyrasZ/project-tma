'use client';
import { FC, useRef, useMemo } from 'react';
import { Select } from '../Select';
import { cn } from '../../../lib/utils';
import { CaretLeft, CaretRight, DotsThree } from '@phosphor-icons/react';

export interface PaginatorProps {
  first: number;
  rows: number;
  totalRecords: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (e: { first: number; rows: number; page: number; pageCount?: number }) => void;
  className?: string;
  itemName?: string;
}

export const Paginator: FC<PaginatorProps> = ({
  className = '',
  first,
  rows,
  totalRecords,
  rowsPerPageOptions = [10, 20, 30, 50],
  onPageChange,
  itemName = 'mục',
}) => {
  const selectOptions = useMemo(
    () =>
      rowsPerPageOptions.map((opt) => ({
        label: `${opt} / trang`,
        value: opt,
      })),
    [rowsPerPageOptions]
  );

  // Preserve the last known positive totalRecords to avoid flicker during background refetching
  const lastTotalRef = useRef(totalRecords);
  if (totalRecords > 0) {
    lastTotalRef.current = totalRecords;
  }
  const effectiveTotal = totalRecords > 0 ? totalRecords : lastTotalRef.current;

  const totalPages = Math.max(1, Math.ceil(effectiveTotal / (rows || 10)));
  const currentPage = Math.min(Math.max(1, Math.floor(first / (rows || 10)) + 1), totalPages);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const handleSelectPage = (pageNumber: number) => {
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages) return;
    const newFirst = (pageNumber - 1) * rows;
    onPageChange?.({
      first: newFirst,
      rows,
      page: pageNumber - 1,
      pageCount: totalPages,
    });
  };

  const handlePrev = () => {
    if (canPrev) {
      handleSelectPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canNext) {
      handleSelectPage(currentPage + 1);
    }
  };

  // Generate page numbers with ellipsis windowing
  const pageItems = useMemo<(number | 'ellipsis')[]>(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  }, [currentPage, totalPages]);

  return (
    <div className={cn('p-4 flex items-center justify-between text-sm text-content-main w-full select-none', className)}>
      {/* Total records indicator */}
      <div className="text-content-sub text-[13px] font-medium">
        {effectiveTotal} {itemName}
      </div>

      {/* Pagination Controls Center/Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {/* Previous Page Button - Always rendered to prevent layout shift */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Trang trước"
            className={cn(
              'size-9 rounded-lg flex items-center justify-center transition-all duration-150 border-none bg-transparent outline-none',
              canPrev
                ? 'text-content-main hover:bg-[#EBF2F2] hover:text-primary active:scale-95 cursor-pointer'
                : 'text-content-hint/60 opacity-30 cursor-not-allowed pointer-events-none'
            )}
          >
            <CaretLeft size={16} weight="bold" />
          </button>

          {/* Page Numbers */}
          {pageItems.map((item, idx) => {
            if (item === 'ellipsis') {
              return (
                <div
                  key={`ellipsis-${idx}`}
                  className="size-9 flex items-center justify-center text-content-hint select-none"
                >
                  <DotsThree size={18} weight="bold" />
                </div>
              );
            }

            const isActive = item === currentPage;
            return (
              <button
                key={`page-${item}`}
                type="button"
                onClick={() => handleSelectPage(item)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'size-9 rounded-lg flex items-center justify-center text-[13px] transition-all duration-150 border-none outline-none select-none',
                  isActive
                    ? 'bg-primary text-white font-bold shadow-2xs cursor-default'
                    : 'text-content-main font-medium bg-transparent hover:bg-[#EBF2F2] hover:text-primary active:scale-95 cursor-pointer'
                )}
              >
                {item}
              </button>
            );
          })}

          {/* Next Page Button - Always rendered to prevent layout shift */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Trang sau"
            className={cn(
              'size-9 rounded-lg flex items-center justify-center transition-all duration-150 border-none bg-transparent outline-none',
              canNext
                ? 'text-content-main hover:bg-[#EBF2F2] hover:text-primary active:scale-95 cursor-pointer'
                : 'text-content-hint/60 opacity-30 cursor-not-allowed pointer-events-none'
            )}
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>

        {/* Rows Per Page Select */}
        <div className="ml-2 w-[125px]">
          <Select
            value={rows}
            options={selectOptions}
            onChange={(e) => onPageChange?.({ first: 0, rows: Number(e.value), page: 0 })}
            className="h-9 text-[13px] border-border rounded-lg bg-white"
          />
        </div>
      </div>
    </div>
  );
};
