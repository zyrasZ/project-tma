import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Funnel, ArrowsClockwise } from '@phosphor-icons/react';
import { Select, type SelectOption } from '../../../../../components/ui/Select';
import { MultiSelect, type MultiSelectOption } from '../../../../../components/ui/MultiSelect';
import { Button } from '../../../../../components/ui/Button';
import { DebtReportDatePicker } from './DebtReportDatePicker';
import type { DebtReportSummary } from '../../../../../types/debtReport';

interface DebtReportFilterBarProps {
  selectedCustomer: string;
  onCustomerChange: (customerId: string) => void;
  customerOptions: SelectOption[];
  selectedDisplayParams: string[];
  onDisplayParamsChange: (params: string[]) => void;
  displayParamOptions: MultiSelectOption[];
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onResetFilters: () => void;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
  summary?: DebtReportSummary;
}

export const DebtReportFilterBar: FC<DebtReportFilterBarProps> = ({
  selectedCustomer,
  onCustomerChange,
  customerOptions,
  selectedDisplayParams,
  onDisplayParamsChange,
  displayParamOptions,
  dateRange,
  onDateRangeChange,
  onResetFilters,
  isFilterVisible,
  onToggleFilter,
  summary,
}) => {
  const { t } = useTranslation('common');
  const getVal = (e: any) => (e?.value !== undefined ? e.value : e);

  return (
    <div className="flex flex-col bg-white">
      {/* Card Header Row: Title "Báo cáo công nợ" & Right Filter Controls */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-[16px] font-bold text-content-main tracking-tight m-0">
          {t('debtReport.cardTitle', 'Báo cáo công nợ')}
        </h2>

        <div className="flex items-center gap-3">
          {/* Quick Customer select when filter is collapsed */}
          {!isFilterVisible && (
            <div className="w-[200px] sm:w-[240px]">
              <Select
                options={customerOptions}
                value={selectedCustomer}
                onChange={(e) => onCustomerChange(getVal(e))}
                className="h-9 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('debtReport.filter.customerPlaceholder', 'Chọn khách hàng')}
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
              {t('debtReport.filterBtn', 'Bộ lọc')}
            </span>
          </Button>
        </div>
      </div>

      {/* Expanded Filter Controls Row matching user's design */}
      {isFilterVisible && (
        <div className="px-6 pb-5 pt-3 border-t border-divide animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1.2fr_auto] gap-4 items-end">
            {/* 1. Khách hàng * */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5 flex items-center">
                {t('debtReport.filter.customer', 'Khách hàng')}
                <span className="text-red-500 ml-1 font-bold">*</span>
              </label>
              <Select
                options={customerOptions}
                value={selectedCustomer}
                onChange={(e) => onCustomerChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('debtReport.filter.customerPlaceholder', 'Chọn khách hàng')}
              />
            </div>

            {/* 2. Thông số hiển thị */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('debtReport.filter.displayParam', 'Thông số hiển thị')}
              </label>
              <MultiSelect
                options={displayParamOptions}
                value={selectedDisplayParams}
                onChange={(e) => onDisplayParamsChange(e?.value || [])}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('debtReport.filter.displayParamPlaceholder', 'Chọn thông số hiển thị')}
                showSelectAll
                selectAllLabel="Chọn tất cả"
                maxSelectedLabels={1}
              />
            </div>

            {/* 3. Thời gian */}
            <div className="flex flex-col">
              <DebtReportDatePicker
                label={t('debtReport.filter.dateRange', 'Thời gian')}
                value={dateRange}
                onChange={onDateRangeChange}
                placeholder="dd/mm/yyyy → dd/mm/yyyy"
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
                <span>{t('debtReport.filter.reset', 'Đặt lại bộ lọc')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI / Metric Summary Row */}
      <div className="px-6 py-4 flex flex-wrap items-center gap-12 sm:gap-16 border-t border-divide">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[13px] font-medium text-content-sub">
              {t('debtReport.kpi.debtInPeriod', 'Ghi nợ trong kỳ')}
            </span>
            <span className="text-[11px] font-normal text-content-hint">(Tất cả các trang)</span>
          </div>
          <span className="text-[26px] sm:text-[28px] font-extrabold text-content-main tracking-tight leading-none">
            {summary?.debtInPeriod || '0đ'}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[13px] font-medium text-content-sub">
              {t('debtReport.kpi.paidInPeriod', 'Thanh toán trong kỳ')}
            </span>
            <span className="text-[11px] font-normal text-content-hint">(Tất cả các trang)</span>
          </div>
          <span className="text-[26px] sm:text-[28px] font-extrabold text-content-main tracking-tight leading-none">
            {summary?.paidInPeriod || '0đ'}
          </span>
        </div>
      </div>
    </div>
  );
};
