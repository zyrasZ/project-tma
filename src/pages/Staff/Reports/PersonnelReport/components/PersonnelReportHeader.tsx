import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FileXls, FilePdf } from '@phosphor-icons/react';
import { Button } from '../../../../../components/ui/Button';

interface PersonnelReportHeaderProps {
  onExportXlsx: () => void;
  onExportPdf: () => void;
  isExportingXlsx?: boolean;
  isExportingPdf?: boolean;
}

export const PersonnelReportHeader: FC<PersonnelReportHeaderProps> = ({
  onExportXlsx,
  onExportPdf,
  isExportingXlsx = false,
  isExportingPdf = false,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-content-main tracking-tight m-0">
          {t('personnelReport.title', 'Báo cáo')}
        </h1>
      </div>

      {/* Export Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportXlsx}
          loading={isExportingXlsx}
          className="h-9 px-3.5 gap-2 border-primary text-primary hover:bg-primary/10 rounded-lg font-medium text-[13px] shadow-2xs transition-colors"
        >
          <FileXls size={16} weight="regular" />
          <span>{t('personnelReport.exportXlsx', 'Xuất xlsx')}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onExportPdf}
          loading={isExportingPdf}
          className="h-9 px-3.5 gap-2 border-primary text-primary hover:bg-primary/10 rounded-lg font-medium text-[13px] shadow-2xs transition-colors"
        >
          <FilePdf size={16} weight="regular" />
          <span>{t('personnelReport.exportPdf', 'Xuất pdf')}</span>
        </Button>
      </div>
    </div>
  );
};
