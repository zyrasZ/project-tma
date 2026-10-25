import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Funnel, ArrowsClockwise } from '@phosphor-icons/react';
import { Select, type SelectOption } from '../../../../../components/ui/Select';
import { MultiSelect, type MultiSelectOption } from '../../../../../components/ui/MultiSelect';
import { Button } from '../../../../../components/ui/Button';

interface PersonnelReportFilterBarProps {
  selectedStation: string;
  onStationChange: (stationId: string) => void;
  stationOptions: SelectOption[];
  selectedDisplayParams: string[];
  onDisplayParamsChange: (params: string[]) => void;
  displayParamOptions: MultiSelectOption[];
  selectedRole: string;
  onRoleChange: (role: string) => void;
  roleOptions: SelectOption[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  statusOptions: SelectOption[];
  onResetFilters: () => void;
  isFilterVisible: boolean;
  onToggleFilter: () => void;
}

export const PersonnelReportFilterBar: FC<PersonnelReportFilterBarProps> = ({
  selectedStation,
  onStationChange,
  stationOptions,
  selectedDisplayParams,
  onDisplayParamsChange,
  displayParamOptions,
  selectedRole,
  onRoleChange,
  roleOptions,
  selectedStatus,
  onStatusChange,
  statusOptions,
  onResetFilters,
  isFilterVisible,
  onToggleFilter,
}) => {
  const { t } = useTranslation('common');
  const getVal = (e: any) => (e?.value !== undefined ? e.value : e);

  return (
    <div className="flex flex-col bg-white">
      {/* Card Header Row: Title "Báo cáo nhân sự" & Right Filter Toggle Button */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-[16px] font-bold text-content-main tracking-tight m-0">
          {t('personnelReport.cardTitle', 'Báo cáo nhân sự')}
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
                placeholder={t('personnelReport.filter.stationPlaceholder', 'Chọn trạm')}
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
              {t('personnelReport.filterBtn', 'Bộ lọc')}
            </span>
          </Button>
        </div>
      </div>

      {/* Expanded Filter Controls Row matching user's design */}
      {isFilterVisible && (
        <div className="px-6 pb-5 pt-3 border-t border-divide animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3.5 items-end">
            {/* 1. Trạm */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5 flex items-center">
                {t('personnelReport.filter.station', 'Trạm')}
              </label>
              <Select
                options={stationOptions}
                value={selectedStation}
                onChange={(e) => onStationChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('personnelReport.filter.stationPlaceholder', 'Chọn trạm')}
              />
            </div>

            {/* 2. Thông số hiển thị */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('personnelReport.filter.displayParam', 'Thông số hiển thị')}
              </label>
              <MultiSelect
                options={displayParamOptions}
                value={selectedDisplayParams}
                onChange={(e) => onDisplayParamsChange(e?.value || [])}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('personnelReport.filter.displayParamPlaceholder', 'Chọn thông số hiển thị')}
                showSelectAll
                selectAllLabel="Chọn tất cả"
                maxSelectedLabels={1}
              />
            </div>

            {/* 3. Phân quyền */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('personnelReport.filter.role', 'Phân quyền')}
              </label>
              <Select
                options={roleOptions}
                value={selectedRole}
                onChange={(e) => onRoleChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('personnelReport.filter.rolePlaceholder', 'Chọn phân quyền')}
              />
            </div>

            {/* 4. Trạng thái */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-content-main mb-1.5">
                {t('personnelReport.filter.status', 'Trạng thái')}
              </label>
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={(e) => onStatusChange(getVal(e))}
                className="h-10 text-[13px] border-border rounded-lg bg-white"
                placeholder={t('personnelReport.filter.statusPlaceholder', 'Chọn trạng thái')}
              />
            </div>

            {/* 5. Đặt lại bộ lọc Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={onResetFilters}
                className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#EBF2F2] hover:bg-[#DEEAEA] active:bg-[#D5E3E3] text-content-main text-[13px] font-medium border border-border/40 transition-colors cursor-pointer select-none whitespace-nowrap shadow-2xs"
              >
                <ArrowsClockwise size={16} weight="regular" className="text-content-main" />
                <span>{t('personnelReport.filter.reset', 'Đặt lại bộ lọc')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
