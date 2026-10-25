import React, { useMemo } from 'react';
import {
  DataTable,
  DataTableTableContainer,
  DataTableTable,
  DataTableTHead,
  DataTableTHeadRow,
  DataTableTHeadCell,
  DataTableTBody,
  DataTableRow,
  DataTableCell,
  DataTableLoading,
} from './DataTable';

export const REPORT_TABLE_BORDER_COLOR = 'var(--Color-Border-Neutral, #C0C4C4)';
export const REPORT_TABLE_BORDER_SOLID = '1px solid var(--Color-Border-Neutral, #C0C4C4)';

export interface ReportColumnDef<T> {
  key: string;
  header: React.ReactNode;
  minWidth?: string;
  /** Nếu truyền paramKey, cột chỉ hiển thị khi displayParams rỗng (mặc định) HOẶC displayParams chứa paramKey này */
  paramKey?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
  cellClassName?: string | ((item: T, index: number) => string | undefined);
  defaultVal?: string;
  render?: (item: T, index: number) => React.ReactNode;
  /** Giá trị hoặc component hiển thị tại dòng tổng hợp (summary) */
  summaryValue?: React.ReactNode | ((summary: any) => React.ReactNode);
}

export interface ReportDataTableProps<T> {
  data: T[];
  columns: ReportColumnDef<T>[];
  displayParams?: string[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  rowClassName?: (item: T, index: number) => string | undefined;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
  /** Cho phép tùy biến Header (dành cho các bảng có Header 2 tầng như Báo cáo doanh thu theo ca) */
  customHeader?: (visibleColumns: ReportColumnDef<T>[]) => React.ReactNode;
  /** Cho phép bổ sung dòng Tổng / Summary ở đầu bảng (ngay dưới Header, tính tổng cho toàn bộ các trang) */
  summaryRow?: (visibleColumns: ReportColumnDef<T>[]) => React.ReactNode;
  /** Cho phép bổ sung dòng Footer / Summary ở chân bảng */
  customFooter?: (visibleColumns: ReportColumnDef<T>[]) => React.ReactNode;
}

export function ReportDataTable<T>({
  data,
  columns,
  displayParams = [],
  isLoading = false,
  onRowClick,
  rowClassName,
  keyExtractor,
  emptyMessage = 'Không có dữ liệu',
  className = '',
  customHeader,
  summaryRow,
  customFooter,
}: ReportDataTableProps<T>) {
  // Tự động lọc các cột hiển thị theo thông số displayParams
  const isDefaultOrAll = !displayParams || displayParams.length === 0;

  const visibleColumns = useMemo(() => {
    return columns.filter((col) => {
      if (!col.paramKey) return true; // Cột cố định (không bị ẩn)
      return isDefaultOrAll || displayParams.includes(col.paramKey);
    });
  }, [columns, displayParams, isDefaultOrAll]);

  const alignClassMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <DataTable className={`w-full relative ${className}`}>
      {isLoading && <DataTableLoading />}

      <DataTableTableContainer
        className="overflow-x-auto"
        style={{
          borderWidth: '1px 1px 1px 0px',
          borderStyle: 'solid',
          borderColor: REPORT_TABLE_BORDER_COLOR,
        }}
      >
        <DataTableTable className="w-full text-left border-collapse">
          {/* Header */}
          {customHeader ? (
            customHeader(visibleColumns)
          ) : (
            <DataTableTHead>
              <DataTableTHeadRow
                className="bg-grey-primary-60 text-[13px] text-content-main"
                style={{ borderBottom: REPORT_TABLE_BORDER_SOLID }}
              >
                {visibleColumns.map((col, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === visibleColumns.length - 1;
                  const alignCls = col.align ? alignClassMap[col.align] : 'text-left';

                  return (
                    <DataTableTHeadCell
                      key={col.key}
                      className={`py-3 px-4 font-semibold text-content-main whitespace-nowrap align-middle ${alignCls} ${
                        isFirst ? 'pl-6' : ''
                      } ${isLast ? 'pr-6' : ''} ${col.headerClassName || ''}`}
                      style={{
                        minWidth: col.minWidth,
                        borderRight: !isLast ? REPORT_TABLE_BORDER_SOLID : undefined,
                      }}
                    >
                      {col.header}
                    </DataTableTHeadCell>
                  );
                })}
              </DataTableTHeadRow>
            </DataTableTHead>
          )}

          {/* Body */}
          <DataTableTBody>
            {/* Top Summary Row (tính tổng tất cả các trang) */}
            {summaryRow && summaryRow(visibleColumns)}

            {data.length === 0 ? (
              <DataTableRow>
                <DataTableCell
                  colSpan={visibleColumns.length}
                  className="py-12 text-center text-content-sub text-sm"
                  style={{ borderBottom: REPORT_TABLE_BORDER_SOLID }}
                >
                  {emptyMessage}
                </DataTableCell>
              </DataTableRow>
            ) : (
              data.map((item, index) => {
                const rowKey = keyExtractor
                  ? keyExtractor(item, index)
                  : (item as any)?.id !== undefined
                  ? `${(item as any).id}-${index}`
                  : index;

                const customRowCls = rowClassName ? rowClassName(item, index) : '';
                const defaultRowBg = 'bg-white hover:bg-grey-primary-60/40';

                return (
                  <DataTableRow
                    key={rowKey}
                    onClick={() => onRowClick?.(item)}
                    className={`${customRowCls || defaultRowBg} transition-colors cursor-pointer text-[13px] text-content-main`}
                    style={{ borderBottom: REPORT_TABLE_BORDER_SOLID }}
                  >
                    {visibleColumns.map((col, colIdx) => {
                      const isFirst = colIdx === 0;
                      const isLast = colIdx === visibleColumns.length - 1;
                      const alignCls = col.align ? alignClassMap[col.align] : 'text-left';

                      const rawVal = (item as any)?.[col.key];
                      const displayVal =
                        rawVal !== undefined && rawVal !== null && rawVal !== ''
                          ? rawVal
                          : col.defaultVal !== undefined
                          ? col.defaultVal
                          : '';

                      const dynamicCellCls =
                        typeof col.cellClassName === 'function'
                          ? col.cellClassName(item, index)
                          : col.cellClassName || '';

                      return (
                        <DataTableCell
                          key={col.key}
                          className={`py-3.5 px-4 whitespace-nowrap align-middle text-content-main ${alignCls} ${
                            isFirst ? 'pl-6 font-medium' : ''
                          } ${isLast ? 'pr-6' : ''} ${col.className || ''} ${dynamicCellCls}`}
                          style={{
                            borderRight: !isLast ? REPORT_TABLE_BORDER_SOLID : undefined,
                          }}
                        >
                          {col.render ? col.render(item, index) : displayVal}
                        </DataTableCell>
                      );
                    })}
                  </DataTableRow>
                );
              })
            )}

            {/* Custom Footer (e.g. Summary row) */}
            {customFooter && customFooter(visibleColumns)}
          </DataTableTBody>
        </DataTableTable>
      </DataTableTableContainer>
    </DataTable>
  );
}
