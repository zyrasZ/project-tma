import { FC } from 'react';

interface InvoiceReportBreadcrumbProps {
  className?: string;
}

export const InvoiceReportBreadcrumb: FC<InvoiceReportBreadcrumbProps> = ({ className = '' }) => {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={`flex items-center text-[13px] text-content-sub font-normal ${className}`}
    >
      <span className="hover:text-content-main cursor-pointer transition-colors">
        Báo cáo
      </span>
      <span className="mx-1 text-content-hint">/</span>
      <span className="text-content-main font-medium">
        Hóa đơn
      </span>
    </nav>
  );
};
