import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Funnel, ArrowsClockwise } from '@phosphor-icons/react';
import { Select, type SelectOption } from '../../../../../components/ui/Select';
import { MultiSelect, type MultiSelectOption } from '../../../../../components/ui/MultiSelect';
import { Button } from '../../../../../components/ui/Button';
import { ShiftRevenueReportDatePicker } from './ShiftRevenueReportDatePicker';

interface ShiftRevenueReportFilterBarProps {
  selectedStation: string;
  onStationChange: (stationId: string) => void;
  stationOptions: SelectOption[];
  selectedDisplayParams: string[];
  onDisplayParamsChange: (params: string[]) => void;
  displayParamOptions: MultiSelectOption[];
  startDate: string;
  onStartDateChange: (date: string) => void;
  onResetFilters: () => void;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
}

export const ShiftRevenueReportFilterBar: FC<ShiftRevenueReportFilterBarProps> = ({
  selectedStation,
  onStationChange,
  stationOptions,
  selectedDisplayParams,
  onDisplayParamsChange,
  displayParamOptions,
  startDate,
  onStartDateChange,
  onResetFilters,
  isFilterVisible,
  onToggleFilter,
}) => {
  const { t } = useTranslation('common');
  const getVal = (e: any) => (e?.value !== undefined ? e.value : e);

  return (
    <div className="flex flex-col bg-white">
      {/* Card Header Row: Title "Báo cáo ca" & Right Filter Toggle Button */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-[16px] font-bold text-content-main tracking-tight m-0">
          {t('shiftReport.cardTitle', 'Báo cáo ca')}
        </h2>

        <div className="flex items-center gap-3">
          {/* Quick Station select when filter is collapsed */}
          {!isFilterVisible && (
            <div className="w-[180px] sm:w-[220px]">
              <Select
                options={stationOptions}
                value={selectedStation}
                onChange={(e) => onStationChange(getVal(e))}
                className="h-9 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('shiftReport.filter.stationPlaceholder', 'Chọn trạm')}
              />
            </div>
          )}

          {/* Toggle Filter Button with solid teal primary color when active */}
          <Button
            variant={isFilterVisible ? 'primary' : 'outline'}
            size="sm"
            onClick={onToggleFilter}
            className={`h-9 px-3.5 gap-2 font-medium text-[13px] rounded-lg shadow-2xs transition-all group ${
              isFilterVisible
                ? 'bg-primary hover:bg-turquoise-700 text-white border-transparent'
                : 'bg-transparent border-primary text-primary hover:bg-primary/10 hover:!text-primary'
            }`}
          >
            <Funnel
              size={16}
              weight="regular"
              className={isFilterVisible ? 'text-white' : 'text-primary group-hover:text-primary'}
            />
            <span className={isFilterVisible ? 'text-white' : 'text-primary group-hover:text-primary'}>
              {t('shiftReport.filterBtn', 'Bộ lọc')}
            </span>
          </Button>
        </div>
      </div>

      {/* Expanded Filter Controls Row */}
      {isFilterVisible && (
        <div className="px-6 pb-5 pt-3 border-t border-divide animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
            {/* 1. Trạm * */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5 flex items-center">
                {t('shiftReport.filter.station', 'Trạm')}
                <span className="text-red-500 ml-1 font-semibold">*</span>
              </label>
              <Select
                options={stationOptions}
                value={selectedStation}
                onChange={(e) => onStationChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('shiftReport.filter.stationPlaceholder', 'Chọn trạm')}
              />
            </div>

            {/* 2. Thông số hiển thị (MultiSelect: cho phép chọn nhiều thông số cùng lúc) */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('shiftReport.filter.displayParam', 'Thông số hiển thị')}
              </label>
              <MultiSelect
                options={displayParamOptions}
                value={selectedDisplayParams}
                onChange={(e) => onDisplayParamsChange(e?.value || [])}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('shiftReport.filter.displayParamPlaceholder', 'Chọn thông số hiển thị')}
                showSelectAll
                selectAllLabel="Chọn tất cả"
                maxSelectedLabels={1}
              />
            </div>

            {/* 3. Ngày bắt đầu */}
            <div className="flex flex-col">
              <ShiftRevenueReportDatePicker
                label={t('shiftReport.filter.startDate', 'Ngày bắt đầu')}
                value={startDate}
                onChange={onStartDateChange}
                placeholder={t('shiftReport.filter.startDatePlaceholder', 'dd/mm/yyyy')}
              />
            </div>

            {/* 4. Đặt lại bộ lọc Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={onResetFilters}
                className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#EBF2F2] hover:bg-[#DEEAEA] active:bg-[#D5E3E3] text-content-main text-[13px] font-medium border border-border/40 transition-colors cursor-pointer select-none whitespace-nowrap shadow-2xs"
              >
                <ArrowsClockwise size={16} weight="regular" className="text-content-main" />
                <span>{t('shiftReport.filter.reset', 'Đặt lại bộ lọc')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
