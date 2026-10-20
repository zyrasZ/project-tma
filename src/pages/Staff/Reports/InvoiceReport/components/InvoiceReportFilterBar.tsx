import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Funnel, ArrowsClockwise } from '@phosphor-icons/react';
import { Select, type SelectOption } from '../../../../../components/ui/Select';
import { Button } from '../../../../../components/ui/Button';
import { InvoiceReportDateRangePicker } from './InvoiceReportDateRangePicker';

interface InvoiceReportFilterBarProps {
  selectedStation: string;
  onStationChange: (stationId: string) => void;
  stationOptions: SelectOption[];
  selectedDisplayParam: string;
  onDisplayParamChange: (param: string) => void;
  displayParamOptions: SelectOption[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  statusOptions: SelectOption[];
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onResetFilters: () => void;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
}

export const InvoiceReportFilterBar: FC<InvoiceReportFilterBarProps> = ({
  selectedStation,
  onStationChange,
  stationOptions,
  selectedDisplayParam,
  onDisplayParamChange,
  displayParamOptions,
  selectedStatus,
  onStatusChange,
  statusOptions,
  dateRange,
  onDateRangeChange,
  onResetFilters,
  isFilterVisible,
  onToggleFilter,
}) => {
  const { t } = useTranslation('common');
  const getVal = (e: any) => (e?.value !== undefined ? e.value : e);

  return (
    <div className="flex flex-col bg-white">
      {/* Card Header Row: Title & Right controls */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-[16px] font-bold text-content-main tracking-tight m-0">
          {t('invoiceReport.cardTitle', 'Báo cáo hóa đơn')}
        </h2>

        <div className="flex items-center gap-3">
          {/* Quick Station select when filter is collapsed */}
          {!isFilterVisible && (
            <div className="w-[180px] sm:w-[200px]">
              <Select
                options={stationOptions}
                value={selectedStation}
                onChange={(e) => onStationChange(getVal(e))}
                className="h-9 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('invoiceReport.filter.stationPlaceholder', 'Chọn trạm')}
              />
            </div>
          )}

          {/* Toggle Filter Button */}
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
              {t('invoiceReport.filterBtn', 'Bộ lọc')}
            </span>
          </Button>
        </div>
      </div>

      {/* Expanded Filter Controls Row */}
      {isFilterVisible && (
        <div className="px-6 pb-6 pt-1 flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-4 border-t border-divide/50 animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            {/* 1. Trạm * */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5 flex items-center">
                {t('invoiceReport.filter.station', 'Trạm')}
                <span className="text-alert ml-1">*</span>
              </label>
              <Select
                options={stationOptions}
                value={selectedStation}
                onChange={(e) => onStationChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('invoiceReport.filter.stationPlaceholder', 'Chọn trạm')}
              />
            </div>

            {/* 2. Thông số hiển thị */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('invoiceReport.filter.displayParam', 'Thông số hiển thị')}
              </label>
              <Select
                options={displayParamOptions}
                value={selectedDisplayParam}
                onChange={(e) => onDisplayParamChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('invoiceReport.filter.displayParamPlaceholder', 'Chọn thông số hiển thị')}
              />
            </div>

            {/* 3. Trạng thái */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('invoiceReport.filter.status', 'Trạng thái')}
              </label>
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={(e) => onStatusChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('invoiceReport.filter.statusPlaceholder', 'Chọn trạng thái')}
              />
            </div>

            {/* 4. Ngày bơm */}
            <div className="flex flex-col">
              <InvoiceReportDateRangePicker
                label={t('invoiceReport.filter.pumpDate', 'Ngày bơm')}
                value={dateRange}
                onChange={onDateRangeChange}
              />
            </div>
          </div>

          {/* Reset Filter Button */}
          <div className="xl:pb-2 self-end shrink-0">
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-content-sub hover:text-content-main transition-colors cursor-pointer border-none bg-transparent py-1 px-1 outline-none"
            >
              <ArrowsClockwise size={18} weight="regular" className="text-content-sub" />
              <span>{t('invoiceReport.filter.reset', 'Đặt lại bộ lọc')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
