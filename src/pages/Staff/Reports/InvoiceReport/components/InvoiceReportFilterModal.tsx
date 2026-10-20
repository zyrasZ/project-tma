import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../../components/ui/Modal';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Select } from '../../../../../components/ui/Select';
import { ArrowsClockwise, MagnifyingGlass } from '@phosphor-icons/react';

export interface FilterValues {
  search: string;
  fuelType: string;
  status: string;
}

interface InvoiceReportFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterValues;
  onApply: (newFilters: FilterValues) => void;
  onReset: () => void;
}

export const InvoiceReportFilterModal: FC<InvoiceReportFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
}) => {
  const { t } = useTranslation('common');
  const [localFilters, setLocalFilters] = useState<FilterValues>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const fuelOptions = [
    { label: t('invoiceReport.filter.allFuels', 'Tất cả nhiên liệu'), value: 'all' },
    { label: 'Xăng RON 95-III', value: 'Xăng RON 95-III' },
    { label: 'Xăng A95', value: 'Xăng A95' },
    { label: 'Xăng RON-95', value: 'Xăng RON-95' },
    { label: 'Dầu DO 0.05S', value: 'Dầu DO 0.05S' },
    { label: 'Dầu DO 0.001S-V', value: 'Dầu DO 0.001S-V' },
    { label: 'Xăng E5 RON 92-II', value: 'Xăng E5 RON 92-II' },
  ];

  const statusOptions = [
    { label: t('invoiceReport.filter.allStatuses', 'Tất cả trạng thái'), value: 'all' },
    { label: t('invoiceReport.stats.issued', 'Hóa đơn đã xuất'), value: 'issued' },
    { label: t('invoiceReport.stats.pending', 'Hóa đơn chưa xuất'), value: 'pending' },
    { label: t('invoiceReport.stats.error', 'Hóa đơn xuất lỗi'), value: 'error' },
    { label: t('invoiceReport.stats.flagged', 'Hóa đơn đánh dấu'), value: 'flagged' },
  ];

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: FilterValues = {
      search: '',
      fuelType: 'all',
      status: 'all',
    };
    setLocalFilters(emptyFilters);
    onReset();
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('invoiceReport.filterModal.title', 'Bộ lọc báo cáo')}
      className="w-full max-w-[480px]"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button
            variant="text-neutral"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-content-sub hover:text-content-main"
          >
            <ArrowsClockwise size={16} />
            <span>{t('invoiceReport.filterModal.reset', 'Đặt lại')}</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              {t('invoiceReport.filterModal.cancel', 'Hủy')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
            >
              {t('invoiceReport.filterModal.apply', 'Áp dụng')}
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-6 flex flex-col gap-4">
        {/* Search */}
        <div>
          <Input
            label={t('invoiceReport.filterModal.searchLabel', 'Tìm kiếm')}
            placeholder={t('invoiceReport.filterModal.searchPlaceholder', 'Mã bơm, mã KH, người mua, MST...')}
            value={localFilters.search}
            onChange={(e: any) => setLocalFilters({ ...localFilters, search: e.target.value })}
            iconLeft={<MagnifyingGlass size={18} className="text-content-hint ml-3" />}
          />
        </div>

        {/* Fuel Type */}
        <div>
          <Select
            label={t('invoiceReport.filterModal.fuelLabel', 'Loại nhiên liệu')}
            options={fuelOptions}
            value={localFilters.fuelType}
            onChange={(e) => setLocalFilters({ ...localFilters, fuelType: e.value })}
          />
        </div>

        {/* Invoice Status */}
        <div>
          <Select
            label={t('invoiceReport.filterModal.statusLabel', 'Trạng thái hóa đơn')}
            options={statusOptions}
            value={localFilters.status}
            onChange={(e) => setLocalFilters({ ...localFilters, status: e.value })}
          />
        </div>
      </div>
    </Modal>
  );
};
