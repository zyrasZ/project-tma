import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FileXls, FilePdf } from '@phosphor-icons/react';
import { Button } from '../../../../../components/ui/Button';

interface DebtReportHeaderProps {
  onExportXlsx: () => void;
  onExportPdf: () => void;
  isExportingXlsx?: boolean;
  isExportingPdf?: boolean;
}

export const DebtReportHeader: FC<DebtReportHeaderProps> = ({
  onExportXlsx,
  onExportPdf,
  isExportingXlsx = false,
  isExportingPdf = false,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-content-main tracking-tight m-0">
        {t('debtReport.header.title', 'Báo cáo')}
      </h1>

      <div className="flex items-center gap-3">
        {/* Export XLSX Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportXlsx}
          disabled={isExportingXlsx}
          className="h-9 px-3.5 gap-2 border-primary text-primary hover:bg-primary/10 hover:!text-primary font-medium text-[13px] rounded-lg shadow-2xs transition-all cursor-pointer group"
        >
          <FileXls size={16} weight="regular" className="text-primary group-hover:text-primary shrink-0" />
          <span className="text-primary group-hover:text-primary">
            {isExportingXlsx
              ? t('debtReport.header.exporting', 'Đang xuất...')
              : t('debtReport.header.exportXlsx', 'Xuất xlsx')}
          </span>
        </Button>

        {/* Export PDF Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportPdf}
          disabled={isExportingPdf}
          className="h-9 px-3.5 gap-2 border-primary text-primary hover:bg-primary/10 hover:!text-primary font-medium text-[13px] rounded-lg shadow-2xs transition-all cursor-pointer group"
        >
          <FilePdf size={16} weight="regular" className="text-primary group-hover:text-primary shrink-0" />
          <span className="text-primary group-hover:text-primary">
            {isExportingPdf
              ? t('debtReport.header.exporting', 'Đang xuất...')
              : t('debtReport.header.exportPdf', 'Xuất pdf')}
          </span>
        </Button>
      </div>
    </div>
  );
};
