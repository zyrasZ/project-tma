import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '../../../../components/ui/Card';
import { Paginator } from '../../../../components/ui/Paginator';
import { useAppToast } from '../../../../components/ui/Toast';
import {
  useGetPersonnelReports,
  useExportPersonnelXlsx,
  useExportPersonnelPdf,
} from '../../../../hooks/api/reports/usePersonnelReports';
import { stationOptionsMock } from '../../../../mocks/invoiceReports.mock';
import {
  roleOptionsMock,
  statusOptionsMock,
  personnelDisplayParamOptionsMock,
} from '../../../../mocks/personnelReports.mock';
import type { PersonnelReportItem } from '../../../../types/personnelReport';

import {
  PersonnelReportHeader,
  PersonnelReportFilterBar,
  PersonnelReportTable,
  PersonnelReportDetailModal,
} from './components';

export const PersonnelReportPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();

  // Filter local states (matches user design screenshot)
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [selectedDisplayParams, setSelectedDisplayParams] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<PersonnelReportItem | null>(null);

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Fetch report data (immediate 0ms response for Dropdown filters)
  const { data: reportData, isLoading, isFetching } = useGetPersonnelReports({
    stationId: selectedStation,
    role: selectedRole,
    status: selectedStatus,
    first,
    rows,
  });

  const isDataLoading = isLoading || isFetching;

  const { mutate: exportXlsx, isPending: isExportingXlsx } = useExportPersonnelXlsx();
  const { mutate: exportPdf, isPending: isExportingPdf } = useExportPersonnelPdf();

  const reports = reportData?.data || [];
  const totalRecords = reportData?.total || 0;

  // Pagination handler
  const handlePageChange = (event: { first: number; rows: number; page: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedStation('all');
    setSelectedDisplayParams([]);
    setSelectedRole('');
    setSelectedStatus('');
    setFirst(0);
  };

  // Export handlers
  const handleExportXlsx = () => {
    exportXlsx(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('personnelReport.toast.success', 'Thành công'),
          message: `${t('personnelReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('personnelReport.toast.error', 'Thất bại'),
          message: t('personnelReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  const handleExportPdf = () => {
    exportPdf(undefined, {
      onSuccess: (res) => {
        showToast({
          title: t('personnelReport.toast.success', 'Thành công'),
          message: `${t('personnelReport.toast.exportSuccess', 'Đã xuất file thành công')}: ${res.filename}`,
          severity: 'success',
        });
      },
      onError: () => {
        showToast({
          title: t('personnelReport.toast.error', 'Thất bại'),
          message: t('personnelReport.toast.exportFailed', 'Có lỗi xảy ra khi xuất dữ liệu'),
          severity: 'error',
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-full pb-10">
      {/* Page Header */}
      <PersonnelReportHeader
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
          <PersonnelReportFilterBar
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
            displayParamOptions={personnelDisplayParamOptionsMock}
            selectedRole={selectedRole}
            onRoleChange={(val) => {
              setSelectedRole(val);
              setFirst(0);
            }}
            roleOptions={roleOptionsMock}
            selectedStatus={selectedStatus}
            onStatusChange={(val) => {
              setSelectedStatus(val);
              setFirst(0);
            }}
            statusOptions={statusOptionsMock}
            onResetFilters={handleResetFilters}
            isFilterVisible={isFilterVisible}
            onToggleFilter={() => setIsFilterVisible(!isFilterVisible)}
          />

          {/* Table */}
          <div className="bg-white">
            <PersonnelReportTable
              reports={reports}
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
            itemName={t('personnelReport.itemName', 'nhân sự')}
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>

      {/* Detail Modal */}
      <PersonnelReportDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        personnel={selectedRow}
      />
    </div>
  );
};

export default PersonnelReportPage;
