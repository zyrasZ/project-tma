import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '../../../../components/ui/Card';
import { Paginator } from '../../../../components/ui/Paginator';
import { useAppToast } from '../../../../components/ui/Toast';
import {
  useGetShiftRevenueReports,
  useExportShiftRevenueXlsx,
  useExportShiftRevenuePdf,
} from '../../../../hooks/api/reports/useShiftRevenueReports';
import {
  stationOptionsMock,
} from '../../../../mocks/invoiceReports.mock';
import {
  displayParamOptionsMock,
} from '../../../../mocks/shiftRevenueReports.mock';
import type { ShiftRevenueItem } from '../../../../types/shiftRevenueReport';

import {
  ShiftRevenueReportHeader,
  ShiftRevenueReportFilterBar,
  ShiftRevenueReportTable,
  ShiftRevenueReportDetailModal,
} from './components';

export const ShiftRevenueReportPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();

  // Filter local states (matches user design screenshot)
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [selectedDisplayParams, setSelectedDisplayParams] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ShiftRevenueItem | null>(null);

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Fetch report data (immediate 0ms response for Dropdown & DatePicker)
  const { data: reportData, isLoading, isFetching } = useGetShiftRevenueReports({
    stationId: selectedStation,
    displayParams: selectedDisplayParams,
    startDate: startDate,
    first,
    rows,
  });

  const isDataLoading = isLoading || isFetching;

  const { mutate: exportXlsx, isPending: isExportingXlsx } = useExportShiftRevenueXlsx();
  const { mutate: exportPdf, isPending: isExportingPdf } = useExportShiftRevenuePdf();

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
    setSelectedStation('all');
    setSelectedDisplayParams([]);
    setStartDate('');
    setFirst(0);
  };

  // Export handlers
  const handleExportXlsx = () => {
    exportXlsx(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('shiftReport.toast.success', 'Thành công'),
          message: `${t('shiftReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('shiftReport.toast.error', 'Thất bại'),
          message: t('shiftReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  const handleExportPdf = () => {
    exportPdf(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('shiftReport.toast.success', 'Thành công'),
          message: `${t('shiftReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('shiftReport.toast.error', 'Thất bại'),
          message: t('shiftReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-full pb-10">
      {/* Page Header */}
      <ShiftRevenueReportHeader
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
          {/* Card Filter Bar */}
          <ShiftRevenueReportFilterBar
            selectedStation={selectedStation}
            onStationChange={(val) => {
              setSelectedStation(val);
              setFirst(0);
            }}
            stationOptions={stationOptionsMock}
            selectedDisplayParams={selectedDisplayParams}
            onDisplayParamsChange={(val) => {
              setSelectedDisplayParams(val);
              setFirst(0);
            }}
            displayParamOptions={displayParamOptionsMock}
            startDate={startDate}
            onStartDateChange={(val) => {
              setStartDate(val);
              setFirst(0);
            }}
            onResetFilters={handleResetFilters}
            isFilterVisible={isFilterVisible}
            onToggleFilter={() => setIsFilterVisible(!isFilterVisible)}
          />

          {/* Table with Grouped Headers and Summary Row */}
          <div className="bg-white">
            <ShiftRevenueReportTable
              reports={reports}
              summary={summary}
              totalRecords={totalRecords}
              isLoading={isDataLoading}
              onRowClick={(item) => setSelectedRow(item)}
              displayParams={selectedDisplayParams}
            />
          </div>
        </CardContent>

        {/* Footer Paginator */}
        <CardFooter className="mt-0 p-4 border-t border-divide bg-white block w-full">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            itemName={t('shiftReport.itemName', 'dòng')}
            rowsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={handlePageChange}
            className="w-full [&_.p-paginator-current]:mr-auto"
          />
        </CardFooter>
      </Card>

      {/* Detail Modal */}
      <ShiftRevenueReportDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        report={selectedRow}
      />
    </div>
  );
};
export default ShiftRevenueReportPage;
