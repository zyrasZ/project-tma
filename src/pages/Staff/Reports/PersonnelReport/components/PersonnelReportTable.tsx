import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { PersonnelReportItem } from '../../../../../types/personnelReport';
import { ReportDataTable, type ReportColumnDef } from '../../../../../components/ui/DataTable';

interface PersonnelReportTableProps {
  reports: PersonnelReportItem[];
  isLoading?: boolean;
  onRowClick?: (report: PersonnelReportItem) => void;
  displayParams?: string[];
}

export const PersonnelReportTable: FC<PersonnelReportTableProps> = ({
  reports,
  isLoading = false,
  onRowClick,
  displayParams = [],
}) => {
  const { t } = useTranslation('common');

  const columns: ReportColumnDef<PersonnelReportItem>[] = useMemo(
    () => [
      {
        key: 'username',
        header: t('personnelReport.table.username', 'Tên đăng nhập'),
        minWidth: '150px',
      },
      {
        key: 'fullName',
        header: t('personnelReport.table.fullName', 'Họ tên'),
        minWidth: '170px',
      },
      {
        key: 'phone',
        header: t('personnelReport.table.phone', 'Số điện thoại'),
        minWidth: '150px',
        paramKey: 'phone',
      },
      {
        key: 'role',
        header: t('personnelReport.table.role', 'Phân quyền'),
        minWidth: '170px',
        paramKey: 'role',
      },
      {
        key: 'stationName',
        header: t('personnelReport.table.station', 'Trạm'),
        minWidth: '190px',
        paramKey: 'station',
      },
      {
        key: 'status',
        header: t('personnelReport.table.status', 'Trạng thái'),
        minWidth: '140px',
        paramKey: 'status',
        render: (item) => {
          const isActive = item.status === 'active';
          return isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#E8F8F0] text-[#12B76A] border border-[#A6F4C5]/50">
              <span className="size-1.5 rounded-full bg-[#12B76A]" />
              {t('personnelReport.status.active', 'Hoạt động')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-grey-neutral-60 text-content-sub border border-divide">
              <span className="size-1.5 rounded-full bg-content-hint" />
              {t('personnelReport.status.inactive', 'Ngừng hoạt động')}
            </span>
          );
        },
      },
    ],
    [t]
  );

  return (
    <ReportDataTable
      data={reports}
      columns={columns}
      displayParams={displayParams}
      isLoading={isLoading}
      onRowClick={onRowClick}
      emptyMessage={t('personnelReport.table.empty', 'Không có dữ liệu báo cáo nhân sự')}
    />
  );
};
