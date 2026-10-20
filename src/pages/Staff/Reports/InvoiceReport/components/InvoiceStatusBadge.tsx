import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '../../../../../components/ui/StatusBadge';
import type { InvoiceReportItem } from '../../../../../types/invoiceReport';

interface InvoiceStatusBadgeProps {
  status: InvoiceReportItem['status'];
}

export const InvoiceStatusBadge: FC<InvoiceStatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation('common');

  switch (status) {
    case 'issued':
      return (
        <StatusBadge
          color="green"
          shape="circle"
          label={t('invoiceReport.stats.issued', 'Đã xuất')}
        />
      );
    case 'error':
      return (
        <StatusBadge
          color="red"
          shape="circle"
          label={t('invoiceReport.stats.error', 'Xuất lỗi')}
        />
      );
    case 'flagged':
      return (
        <StatusBadge
          color="yellow"
          shape="circle"
          label={t('invoiceReport.stats.flagged', 'Đánh dấu')}
        />
      );
    case 'pending':
    default:
      return (
        <StatusBadge
          color="grey"
          shape="circle"
          label={t('invoiceReport.stats.pending', 'Chưa xuất')}
        />
      );
  }
};
