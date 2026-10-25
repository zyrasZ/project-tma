import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { DebtReportItem } from '../../../../../types/debtReport';
import { ReportDataTable, type ReportColumnDef } from '../../../../../components/ui/DataTable';

interface DebtReportTableProps {
  reports: DebtReportItem[];
  isLoading?: boolean;
  onRowClick?: (report: DebtReportItem) => void;
  displayParams?: string[];
}

export const DebtReportTable: FC<DebtReportTableProps> = ({
  reports,
  isLoading = false,
  onRowClick,
  displayParams = [],
}) => {
  const { t } = useTranslation('common');

  const columns: ReportColumnDef<DebtReportItem>[] = useMemo(
    () => [
      {
        key: 'id',
        header: t('debtReport.table.id', 'ID'),
        minWidth: '130px',
        className: 'break-all font-medium',
      },
      {
        key: 'time',
        header: t('debtReport.table.time', 'Thời gian'),
        minWidth: '140px',
      },
      {
        key: 'typeName',
        header: t('debtReport.table.type', 'Loại'),
        minWidth: '100px',
      },
      {
        key: 'product',
        header: t('debtReport.table.product', 'Sản phẩm'),
        minWidth: '130px',
        paramKey: 'product',
      },
      {
        key: 'unit',
        header: t('debtReport.table.unit', 'Đơn vị tính'),
        minWidth: '90px',
        paramKey: 'unit',
      },
      {
        key: 'quantity',
        header: t('debtReport.table.quantity', 'Số lượng'),
        minWidth: '90px',
        paramKey: 'quantity',
      },
      {
        key: 'unitPrice',
        header: t('debtReport.table.unitPrice', 'Đơn giá'),
        minWidth: '90px',
        paramKey: 'unitPrice',
      },
      {
        key: 'amount',
        header: t('debtReport.table.amount', 'Số tiền'),
        minWidth: '110px',
        className: 'font-medium',
        // In user screenshot, Ghi nợ amounts have a soft yellowish cell highlight
        cellClassName: (item) => (item.type !== 'payment' ? 'bg-[#FFF7E8]' : ''),
      },
      {
        key: 'buyerName',
        header: t('debtReport.table.buyerName', 'Tên người mua'),
        minWidth: '140px',
        paramKey: 'buyerName',
      },
      {
        key: 'phone',
        header: t('debtReport.table.phone', 'Số điện thoại'),
        minWidth: '110px',
        paramKey: 'phone',
      },
      {
        key: 'email',
        header: t('debtReport.table.email', 'Email'),
        minWidth: '150px',
        paramKey: 'email',
      },
      {
        key: 'station',
        header: t('debtReport.table.station', 'Trạm'),
        minWidth: '130px',
        paramKey: 'station',
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
      // In user screenshot, Thanh toán rows have a soft greenish row background
      rowClassName={(item) =>
        item.type === 'payment'
          ? 'bg-[#EAF7EE] hover:bg-[#DEEFE3]'
          : 'bg-white hover:bg-grey-primary-60/40'
      }
      emptyMessage={t('debtReport.table.noData', 'Không có dữ liệu')}
    />
  );
};
