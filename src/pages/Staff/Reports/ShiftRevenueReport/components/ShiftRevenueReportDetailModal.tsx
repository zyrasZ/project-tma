import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../../components/ui/Modal';
import { Button } from '../../../../../components/ui/Button';
import type { ShiftRevenueItem } from '../../../../../types/shiftRevenueReport';

interface ShiftRevenueReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ShiftRevenueItem | null;
}

export const ShiftRevenueReportDetailModal: FC<ShiftRevenueReportDetailModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const { t } = useTranslation('common');

  const details = useMemo(() => {
    if (!report) return [];
    return [
      { label: t('shiftReport.table.id', 'ID'), value: report.id },
      { label: t('shiftReport.filter.station', 'Trạm'), value: report.stationName },
      { label: t('shiftReport.filter.shift', 'Ca làm việc'), value: report.shiftName || 'Ca 1' },
      { label: t('shiftReport.modal.staff', 'Nhân viên trực'), value: report.staffName || '-' },
      { label: t('shiftReport.table.startDate', 'Ngày bắt đầu'), value: report.startDate },
      { label: t('shiftReport.table.endDate', 'Ngày kết thúc'), value: report.endDate },
      { label: 'Xăng A95-II (Số lít)', value: `${report.fuelA95.volume} Lít` },
      { label: 'Xăng A95-II (Thành tiền)', value: `${report.fuelA95.amount} VNĐ` },
      { label: 'Dầu DO (Số lít)', value: `${report.fuelDO.volume} Lít` },
      { label: 'Dầu DO (Thành tiền)', value: `${report.fuelDO.amount} VNĐ` },
      { label: t('shiftReport.table.revenue', 'Doanh thu'), value: `${report.revenue} VNĐ` },
      { label: t('shiftReport.table.debt', 'Ghi nợ'), value: `${report.debt} VNĐ` },
    ];
  }, [report, t]);

  if (!report) return null;

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('shiftReport.detailModal.title', 'Chi tiết báo cáo doanh thu ca')}
      className="w-full max-w-[550px]"
      footer={
        <Button variant="secondary" size="sm" onClick={onClose}>
          {t('shiftReport.detailModal.close', 'Đóng')}
        </Button>
      }
    >
      <div className="p-6 divide-y divide-divide max-h-[70vh] overflow-y-auto">
        {details.map((item, idx) => (
          <div key={idx} className="py-2.5 flex justify-between items-center text-sm">
            <span className="text-content-sub font-medium">{item.label}</span>
            <span className="text-content-main font-semibold text-right max-w-[60%] truncate">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
};
