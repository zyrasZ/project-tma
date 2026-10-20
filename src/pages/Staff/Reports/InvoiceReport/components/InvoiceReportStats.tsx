import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { InvoiceReportStats as StatsType } from '../../../../../types/invoiceReport';

interface InvoiceReportStatsProps {
  stats?: StatsType;
  isLoading?: boolean;
}

export const InvoiceReportStats: FC<InvoiceReportStatsProps> = ({
  stats,
  isLoading = false,
}) => {
  const { t } = useTranslation('common');

  const statItems = [
    {
      id: 'issued',
      label: t('invoiceReport.stats.issued', 'Hóa đơn đã xuất'),
      value: stats?.issuedCount ?? 0,
    },
    {
      id: 'pending',
      label: t('invoiceReport.stats.pending', 'Hóa đơn chưa xuất'),
      value: stats?.pendingCount ?? 0,
    },
    {
      id: 'error',
      label: t('invoiceReport.stats.error', 'Hóa đơn xuất lỗi'),
      value: stats?.errorCount ?? 0,
    },
    {
      id: 'flagged',
      label: t('invoiceReport.stats.flagged', 'Hóa đơn đánh dấu'),
      value: stats?.flaggedCount ?? 0,
    },
  ];

  return (
    <div className="px-6 py-5 border-t border-b border-divide bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            <span className="text-[13px] font-medium text-content-sub mb-1">
              {item.label}
            </span>
            {isLoading ? (
              <div className="h-8 w-16 bg-grey-neutral-60 rounded animate-pulse" />
            ) : (
              <span className="text-[28px] font-bold text-content-main tracking-tight leading-none">
                {item.value.toLocaleString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
