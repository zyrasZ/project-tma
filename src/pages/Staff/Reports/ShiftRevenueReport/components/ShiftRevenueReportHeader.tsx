import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FileXls, FilePdf } from '@phosphor-icons/react';
import { Button } from '../../../../../components/ui/Button';

interface ShiftRevenueReportHeaderProps {
  onExportXlsx: () => void;
  onExportPdf: () => void;
  isExportingXlsx?: boolean;
  isExportingPdf?: boolean;
}

export const ShiftRevenueReportHeader: FC<ShiftRevenueReportHeaderProps> = ({
  onExportXlsx,
  onExportPdf,
  isExportingXlsx = false,
  isExportingPdf = false,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Page Title */}
      <div>
        <h1 className="text-[24px] font-bold text-content-main tracking-tight">
          {t('shiftReport.title', 'Báo cáo')}
        </h1>
      </div>

      {/* Action Buttons: Nền trong suốt, viền và chữ teal */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="md"
          onClick={onExportXlsx}
          disabled={isExportingXlsx}
          className="h-10 px-4 gap-2 text-primary border-primary bg-transparent hover:bg-primary/10 hover:!text-primary active:bg-primary/20 active:!text-primary font-medium text-[14px] rounded-lg shadow-none transition-all group"
        >
          <FileXls size={20} weight="regular" className="text-primary group-hover:text-primary transition-colors" />
          <span className="text-primary group-hover:text-primary transition-colors">
            {t('shiftReport.exportXlsx', 'Xuất xlsx')}
          </span>
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={onExportPdf}
          disabled={isExportingPdf}
          className="h-10 px-4 gap-2 text-primary border-primary bg-transparent hover:bg-primary/10 hover:!text-primary active:bg-primary/20 active:!text-primary font-medium text-[14px] rounded-lg shadow-none transition-all group"
        >
          <FilePdf size={20} weight="regular" className="text-primary group-hover:text-primary transition-colors" />
          <span className="text-primary group-hover:text-primary transition-colors">
            {t('shiftReport.exportPdf', 'Xuất pdf')}
          </span>
        </Button>
      </div>
    </div>
  );
};
