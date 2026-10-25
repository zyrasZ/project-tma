import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '../../../../components/ui/Card';
import { Paginator } from '../../../../components/ui/Paginator';
import { useAppToast } from '../../../../components/ui/Toast';
import {
  useGetDebtReports,
  useExportDebtXlsx,
  useExportDebtPdf,
} from '../../../../hooks/api/reports/useDebtReports';
import {
  customerOptionsMock,
  debtDisplayParamOptionsMock,
} from '../../../../mocks/debtReports.mock';
import type { DebtReportItem } from '../../../../types/debtReport';

import {
  DebtReportHeader,
  DebtReportFilterBar,
  DebtReportTable,
} from './components';

export const DebtReportPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();

  // Filter local states (matches user design screenshot)
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [selectedDisplayParams, setSelectedDisplayParams] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [, setSelectedRow] = useState<DebtReportItem | null>(null);

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Fetch report data (immediate 0ms response for Dropdown & DatePicker)
  const { data: reportData, isLoading, isFetching } = useGetDebtReports({
    customerId: selectedCustomer,
    displayParams: selectedDisplayParams,
    dateRange: dateRange,
    first,
    rows,
  });

  const isDataLoading = isLoading || isFetching;

  const { mutate: exportXlsx, isPending: isExportingXlsx } = useExportDebtXlsx();
  const { mutate: exportPdf, isPending: isExportingPdf } = useExportDebtPdf();

  const reports = reportData?.data || [];
  const totalRecords = reportData?.total || 0;
  const summary = reportData?.summary;

  // Pagination handler
  const handlePageChange = (event: { first: number; rows: number; page: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCustomer('all');
    setSelectedDisplayParams([]);
    setDateRange('');
    setFirst(0);
  };

  // Export handlers
  const handleExportXlsx = () => {
    exportXlsx(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('debtReport.toast.success', 'Thành công'),
          message: `${t('debtReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('debtReport.toast.error', 'Thất bại'),
          message: t('debtReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  const handleExportPdf = () => {
    exportPdf(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('debtReport.toast.success', 'Thành công'),
          message: `${t('debtReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('debtReport.toast.error', 'Thất bại'),
          message: t('debtReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-full pb-10">
      {/* Page Header: Title "Báo cáo" & Action Buttons "Xuất xlsx", "Xuất pdf" */}
      <DebtReportHeader
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
        {/* Filter Bar & KPI Summary */}
        <DebtReportFilterBar
          selectedCustomer={selectedCustomer}
          onCustomerChange={(id) => {
            setSelectedCustomer(id);
            setFirst(0);
          }}
          customerOptions={customerOptionsMock}
          selectedDisplayParams={selectedDisplayParams}
          onDisplayParamsChange={(params) => setSelectedDisplayParams(params)}
          displayParamOptions={debtDisplayParamOptionsMock}
          dateRange={dateRange}
          onDateRangeChange={(range) => {
            setDateRange(range);
            setFirst(0);
          }}
          onResetFilters={handleResetFilters}
          isFilterVisible={isFilterVisible}
          onToggleFilter={() => setIsFilterVisible((prev) => !prev)}
          summary={summary}
        />

        {/* Table Content */}
        <CardContent className="mt-0 p-0 text-inherit w-full">
          <DebtReportTable
            reports={reports}
            isLoading={isDataLoading}
            onRowClick={(row) => setSelectedRow(row)}
            displayParams={selectedDisplayParams}
          />
        </CardContent>

        {/* Paginator Footer */}
        <CardFooter className="px-6 py-4 flex items-center justify-between border-t border-divide bg-white">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[10, 20, 50]}
            className="w-full justify-between"
          />
        </CardFooter>
      </Card>
    </div>
  );
};
