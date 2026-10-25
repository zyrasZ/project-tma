import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '../../../../components/ui/Card';
import { Paginator } from '../../../../components/ui/Paginator';
import { useAppToast } from '../../../../components/ui/Toast';
import {
  useGetInvoiceReports,
  useExportInvoiceReportXlsx,
  useExportInvoiceReportPdf,
} from '../../../../hooks/api/reports/useInvoiceReports';
import { stationOptionsMock } from '../../../../mocks/invoiceReports.mock';
import type { InvoiceReportItem } from '../../../../types/invoiceReport';

import {
  InvoiceReportHeader,
  InvoiceReportFilterBar,
  InvoiceReportStats,
  InvoiceReportTable,
  InvoiceReportDetailModal,
} from './components';

export const InvoiceReportPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();

  // Filter local states (reactive immediate UI updates)
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [selectedDisplayParam, setSelectedDisplayParam] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<InvoiceReportItem | null>(null);

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Fetch report data using TanStack React Query (immediate 0ms response for Dropdown & DatePicker)
  const { data: reportData, isLoading, isFetching } = useGetInvoiceReports({
    stationId: selectedStation,
    displayParam: selectedDisplayParam,
    status: selectedStatus,
    dateRange: dateRange,
    first,
    rows,
  });

  const isDataLoading = isLoading || isFetching;

  const { mutate: exportXlsx, isPending: isExportingXlsx } = useExportInvoiceReportXlsx();
  const { mutate: exportPdf, isPending: isExportingPdf } = useExportInvoiceReportPdf();

  const reports = reportData?.data || [];
  const totalRecords = reportData?.total || 0;
  const stats = reportData?.stats;

  // Options
  const displayParamOptions = [
    { label: t('invoiceReport.filter.allParams', 'Tất cả thông số'), value: 'all' },
    { label: 'Doanh thu', value: 'revenue' },
    { label: 'Sản lượng', value: 'volume' },
    { label: 'Đơn giá', value: 'unit_price' },
    { label: 'Thành tiền', value: 'amount' },
  ];

  const statusOptions = [
    { label: t('invoiceReport.filter.allStatuses', 'Tất cả trạng thái'), value: 'all' },
    { label: t('invoiceReport.stats.issued', 'Hóa đơn đã xuất'), value: 'issued' },
    { label: t('invoiceReport.stats.pending', 'Hóa đơn chưa xuất'), value: 'pending' },
    { label: t('invoiceReport.stats.error', 'Hóa đơn xuất lỗi'), value: 'error' },
    { label: t('invoiceReport.stats.flagged', 'Hóa đơn đánh dấu'), value: 'flagged' },
  ];

  // Pagination handler
  const handlePageChange = (event: { first: number; rows: number; page: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Reset all filters to default initial values
  const handleResetFilters = () => {
    setSelectedStation('all');
    setSelectedDisplayParam('');
    setSelectedStatus('');
    setDateRange('');
    setFirst(0);
  };

  // Export handlers
  const handleExportXlsx = () => {
    exportXlsx(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('invoiceReport.toast.success', 'Thành công'),
          message: `${t('invoiceReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('invoiceReport.toast.error', 'Thất bại'),
          message: t('invoiceReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  const handleExportPdf = () => {
    exportPdf(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('invoiceReport.toast.success', 'Thành công'),
          message: `${t('invoiceReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('invoiceReport.toast.error', 'Thất bại'),
          message: t('invoiceReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-full pb-10">
      {/* Page Header: Title "Báo cáo" & Action Buttons "Xuất xlsx", "Xuất pdf" */}
      <InvoiceReportHeader
        onExportXlsx={handleExportXlsx}
        onExportPdf={handleExportPdf}
        isExportingXlsx={isExportingXlsx}
        isExportingPdf={isExportingPdf}
      />

      {/* Main Container Card */}
      <Card
        padding="none"
        className="bg-white rounded-xl shadow-xs border border-divide overflow-hidden flex flex-col gap-0"
      >
        <CardContent className="mt-0 p-0 text-inherit">
          {/* Card Filter Bar: Title, "Bộ lọc" button, 4 Filter Inputs & Reset Button */}
          <InvoiceReportFilterBar
            selectedStation={selectedStation}
            onStationChange={(val) => {
              setSelectedStation(val);
              setFirst(0);
            }}
            stationOptions={stationOptionsMock}
            selectedDisplayParam={selectedDisplayParam}
            onDisplayParamChange={(val) => {
              setSelectedDisplayParam(val);
              setFirst(0);
            }}
            displayParamOptions={displayParamOptions}
            selectedStatus={selectedStatus}
            onStatusChange={(val) => {
              setSelectedStatus(val);
              setFirst(0);
            }}
            statusOptions={statusOptions}
            dateRange={dateRange}
            onDateRangeChange={(val) => {
              setDateRange(val);
              setFirst(0);
            }}
            onResetFilters={handleResetFilters}
            isFilterVisible={isFilterVisible}
            onToggleFilter={() => setIsFilterVisible(!isFilterVisible)}
          />

          {/* KPI Statistics Row */}
          <InvoiceReportStats stats={stats} isLoading={isDataLoading} />

          {/* 10-Column Data Table matching design */}
          <div className="bg-white">
            <InvoiceReportTable
              reports={reports}
              isLoading={isDataLoading}
              onRowClick={(item) => setSelectedRow(item)}
            />
          </div>
        </CardContent>

        {/* Footer Paginator */}
        <CardFooter className="mt-0 p-4 border-t border-divide bg-white block w-full">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            itemName={t('invoiceReport.itemName', 'hóa đơn')}
            rowsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={handlePageChange}
            className="w-full [&_.p-paginator-current]:mr-auto"
          />
        </CardFooter>
      </Card>

      {/* Detail Modal */}
      <InvoiceReportDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        report={selectedRow}
      />
    </div>
  );
};
