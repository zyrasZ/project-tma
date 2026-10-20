import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../../components/ui/Modal';
import { Button } from '../../../../../components/ui/Button';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import type { InvoiceReportItem } from '../../../../../types/invoiceReport';

interface InvoiceReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: InvoiceReportItem | null;
}

export const InvoiceReportDetailModal: FC<InvoiceReportDetailModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const { t } = useTranslation('common');

  const details = useMemo(() => {
    if (!report) return [];
    return [
      { label: t('invoiceReport.table.pumpCode', 'Mã bơm'), value: report.pumpCode },
      { label: t('invoiceReport.table.customerCode', 'Mã khách hàng'), value: report.customerCode },
      { label: t('invoiceReport.table.buyerName', 'Tên người mua'), value: report.buyerName },
      { label: t('invoiceReport.table.customerName', 'Tên khách hàng'), value: report.customerName },
      { label: t('invoiceReport.table.taxCode', 'Mã số thuế'), value: report.taxCode },
      { label: t('invoiceReport.table.address', 'Địa chỉ'), value: report.address },
      { label: t('invoiceReport.table.email', 'Email'), value: report.email },
      { label: t('invoiceReport.table.fuelType', 'Nhiên liệu'), value: report.fuelType },
      { label: t('invoiceReport.table.exchangeRate', 'Tỷ giá'), value: report.exchangeRate },
      { label: t('invoiceReport.table.currency', 'Đơn vị tiền tệ'), value: report.currency },
      { label: t('invoiceReport.table.unit', 'Đơn vị tính'), value: report.unit || 'Lít' },
      { label: t('invoiceReport.table.quantity', 'Số lượng'), value: report.quantity || '8,11' },
      { label: t('invoiceReport.table.unitPrice', 'Đơn giá chưa thuế'), value: report.unitPrice || '25.138' },
      { label: t('invoiceReport.table.subtotal', 'Thành tiền'), value: report.subtotal || '110.505' },
      { label: t('invoiceReport.table.taxRate', '% thuế GTGT'), value: report.taxRate || '10%' },
      { label: t('invoiceReport.table.taxAmount', 'Tiền thuế GTGT'), value: report.taxAmount || '10.500' },
      { label: t('invoiceReport.table.totalAmount', 'Tổng tiền'), value: report.totalAmount || '115.000' },
      { label: t('invoiceReport.table.paymentMethod', 'Hình thức thanh toán'), value: report.paymentMethod || 'TM/CK' },
      { label: t('invoiceReport.table.formNumber', 'Mẫu số'), value: report.formNumber || '1' },
      { label: t('invoiceReport.table.symbol', 'Ký hiệu'), value: report.symbol || 'K24TYY' },
      { label: t('invoiceReport.table.pumpDate', 'Ngày bơm'), value: report.pumpDate || '06/11/2023 16:48' },
      { label: t('invoiceReport.table.createdDate', 'Ngày tạo'), value: report.createdDate || '06/11/2023 16:48' },
    ];
  }, [report, t]);

  if (!report) return null;

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('invoiceReport.detailModal.title', 'Chi tiết báo cáo hóa đơn')}
      className="w-full max-w-[600px]"
      footer={
        <Button variant="secondary" size="sm" onClick={onClose}>
          {t('invoiceReport.detailModal.close', 'Đóng')}
        </Button>
      }
    >
      <div className="p-6 divide-y divide-divide max-h-[70vh] overflow-y-auto">
        {/* Status Badge */}
        <div className="py-2.5 flex justify-between items-center text-sm">
          <span className="text-content-sub font-medium">
            {t('invoiceReport.table.status', 'Trạng thái')}
          </span>
          <InvoiceStatusBadge status={report.status} />
        </div>

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
