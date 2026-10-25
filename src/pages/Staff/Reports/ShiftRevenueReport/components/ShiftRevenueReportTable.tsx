import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ShiftRevenueItem, ShiftRevenueSummary } from '../../../../../types/shiftRevenueReport';
import {
  ReportDataTable,
  type ReportColumnDef,
  REPORT_TABLE_BORDER_SOLID,
  DataTableTHead,
  DataTableTHeadRow,
  DataTableTHeadCell,
  DataTableRow,
  DataTableCell,
} from '../../../../../components/ui/DataTable';

interface ShiftRevenueReportTableProps {
  reports: ShiftRevenueItem[];
  summary?: ShiftRevenueSummary;
  totalRecords?: number;
  isLoading?: boolean;
  onRowClick?: (report: ShiftRevenueItem) => void;
  displayParams?: string[];
}

export const ShiftRevenueReportTable: FC<ShiftRevenueReportTableProps> = ({
  reports,
  summary,
  totalRecords,
  isLoading = false,
  onRowClick,
  displayParams = [],
}) => {
  const { t } = useTranslation('common');

  // Dynamic column definitions with integrated summary values (Zero hardcoding)
  const columns: ReportColumnDef<ShiftRevenueItem>[] = useMemo(
    () => [
      {
        key: 'id',
        header: t('shiftReport.table.id', 'ID'),
        minWidth: '90px',
        summaryValue: (
          <div className="flex items-center gap-2">
            <span className="font-bold text-turquoise-900">{t('shiftReport.table.total', 'Tổng')}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
              {totalRecords !== undefined
                ? totalRecords > 10
                  ? `(Tất cả ${totalRecords} ca)`
                  : `(Toàn bộ ${totalRecords} ca)`
                : '(Tất cả các trang)'}
            </span>
          </div>
        ),
      },
      {
        key: 'startDate',
        header: t('shiftReport.table.startDate', 'Ngày bắt đầu'),
        minWidth: '150px',
        summaryValue: '-',
      },
      {
        key: 'endDate',
        header: t('shiftReport.table.endDate', 'Ngày kết thúc'),
        minWidth: '150px',
        summaryValue: '-',
      },
      {
        key: 'fuelA95Volume',
        header: t('shiftReport.table.volume', 'Số lít'),
        minWidth: '100px',
        paramKey: 'volume',
        render: (item) => item.fuelA95.volume,
        summaryValue: summary?.fuelA95Volume,
      },
      {
        key: 'fuelA95Amount',
        header: t('shiftReport.table.amount', 'Thành tiền'),
        minWidth: '120px',
        paramKey: 'amount',
        render: (item) => item.fuelA95.amount,
        summaryValue: summary?.fuelA95Amount,
      },
      {
        key: 'fuelDOVolume',
        header: t('shiftReport.table.volume', 'Số lít'),
        minWidth: '100px',
        paramKey: 'volume',
        render: (item) => item.fuelDO.volume,
        summaryValue: summary?.fuelDOVolume,
      },
      {
        key: 'fuelDOAmount',
        header: t('shiftReport.table.amount', 'Thành tiền'),
        minWidth: '120px',
        paramKey: 'amount',
        render: (item) => item.fuelDO.amount,
        summaryValue: summary?.fuelDOAmount,
      },
      {
        key: 'revenue',
        header: t('shiftReport.table.revenue', 'Doanh thu'),
        minWidth: '130px',
        paramKey: 'revenue',
        render: (item) => item.revenue,
        summaryValue: summary?.revenue,
      },
      {
        key: 'debt',
        header: t('shiftReport.table.debt', 'Ghi nợ'),
        minWidth: '120px',
        paramKey: 'debt',
        render: (item) => item.debt,
        summaryValue: summary?.debt,
      },
    ],
    [t, summary, totalRecords]
  );

  // Fully dynamic 2-tier Grouped Header for Fuel categories (Zero hardcoded cells)
  const renderCustomHeader = (visibleCols: ReportColumnDef<ShiftRevenueItem>[]) => {
    const a95Cols = visibleCols.filter((c) => c.key.startsWith('fuelA95'));
    const doCols = visibleCols.filter((c) => c.key.startsWith('fuelDO'));
    const fuelSubCols = [...a95Cols, ...doCols];

    const hasFuelGroup = fuelSubCols.length > 0;
    const headerRowSpan = hasFuelGroup ? 2 : 1;

    const baseCols = visibleCols.filter(
      (c) =>
        !c.key.startsWith('fuelA95') &&
        !c.key.startsWith('fuelDO') &&
        c.key !== 'revenue' &&
        c.key !== 'debt'
    );
    const trailingCols = visibleCols.filter(
      (c) => c.key === 'revenue' || c.key === 'debt'
    );

    return (
      <DataTableTHead>
        {/* Tier 1 Header */}
        <DataTableTHeadRow
          className="bg-grey-primary-60 text-[13px] text-content-main"
          style={{ borderBottom: REPORT_TABLE_BORDER_SOLID }}
        >
          {/* Base leading columns: ID, Ngày bắt đầu, Ngày kết thúc */}
          {baseCols.map((col, idx) => (
            <DataTableTHeadCell
              key={`h1-${col.key}`}
              rowSpan={headerRowSpan}
              className={`py-3 px-4 font-semibold text-content-main whitespace-nowrap align-middle ${
                idx === 0 ? 'pl-6' : ''
              }`}
              style={{
                minWidth: col.minWidth,
                borderRight: REPORT_TABLE_BORDER_SOLID,
              }}
            >
              {col.header}
            </DataTableTHeadCell>
          ))}

          {/* Group 1: Xăng A95-II */}
          {a95Cols.length > 0 && (
            <DataTableTHeadCell
              colSpan={a95Cols.length}
              className="py-2.5 px-4 font-semibold text-content-main whitespace-nowrap text-center"
              style={{ borderRight: REPORT_TABLE_BORDER_SOLID }}
            >
              {t('shiftReport.table.fuelA95', 'Xăng A95-II')}
            </DataTableTHeadCell>
          )}

          {/* Group 2: Dầu DO */}
          {doCols.length > 0 && (
            <DataTableTHeadCell
              colSpan={doCols.length}
              className="py-2.5 px-4 font-semibold text-content-main whitespace-nowrap text-center"
              style={{
                borderRight: trailingCols.length > 0 ? REPORT_TABLE_BORDER_SOLID : undefined,
              }}
            >
              {t('shiftReport.table.fuelDO', 'Dầu DO')}
            </DataTableTHeadCell>
          )}

          {/* Trailing columns: Doanh thu, Ghi nợ */}
          {trailingCols.map((col, idx) => {
            const isLast = idx === trailingCols.length - 1;
            return (
              <DataTableTHeadCell
                key={`h1-${col.key}`}
                rowSpan={headerRowSpan}
                className={`py-3 px-4 font-semibold text-content-main whitespace-nowrap align-middle ${
                  isLast ? 'pr-6' : ''
                }`}
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

        {/* Tier 2 Header: Dynamic fuel sub-columns (Số lít, Thành tiền) */}
        {hasFuelGroup && (
          <DataTableTHeadRow
            className="bg-grey-primary-60 text-[12px] text-content-main"
            style={{ borderBottom: REPORT_TABLE_BORDER_SOLID }}
          >
            {fuelSubCols.map((col, idx) => {
              const isLastSub = idx === fuelSubCols.length - 1;
              const hasTrailing = trailingCols.length > 0;
              return (
                <DataTableTHeadCell
                  key={`h2-${col.key}`}
                  className="py-2 px-4 font-semibold text-content-main whitespace-nowrap"
                  style={{
                    minWidth: col.minWidth,
                    borderRight: !isLastSub || hasTrailing ? REPORT_TABLE_BORDER_SOLID : undefined,
                  }}
                >
                  {col.header}
                </DataTableTHeadCell>
              );
            })}
          </DataTableTHeadRow>
        )}
      </DataTableTHead>
    );
  };

  // Completely dynamic Top Summary Row mapping over visible columns (Zero hardcoded cells)
  const renderSummaryRow = (visibleCols: ReportColumnDef<ShiftRevenueItem>[]) => {
    if (!summary) return null;

    return (
      <DataTableRow
        className="bg-[#EBF7F7] text-[13px] text-content-main font-semibold"
        style={{ borderBottom: REPORT_TABLE_BORDER_SOLID }}
      >
        {visibleCols.map((col, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === visibleCols.length - 1;
          const val =
            typeof col.summaryValue === 'function'
              ? col.summaryValue(summary)
              : col.summaryValue ?? '-';

          return (
            <DataTableCell
              key={`summary-${col.key}`}
              className={`py-3.5 px-4 font-bold text-content-main whitespace-nowrap ${
                isFirst ? 'pl-6' : ''
              } ${isLast ? 'pr-6' : ''}`}
              style={{
                borderRight: !isLast ? REPORT_TABLE_BORDER_SOLID : undefined,
              }}
            >
              {val}
            </DataTableCell>
          );
        })}
      </DataTableRow>
    );
  };

  return (
    <ReportDataTable
      data={reports}
      columns={columns}
      displayParams={displayParams}
      isLoading={isLoading}
      onRowClick={onRowClick}
      emptyMessage={t('shiftReport.table.empty', 'Không có dữ liệu báo cáo doanh thu theo ca')}
      customHeader={renderCustomHeader}
      summaryRow={renderSummaryRow}
    />
  );
};
