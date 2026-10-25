import { FC, useState, useMemo, useEffect, useRef } from 'react';
import { CalendarBlank, Check, ArrowRight, Clock, X } from '@phosphor-icons/react';
import {
  DatePicker,
  DatePickerPanel,
  DatePickerBody,
  DatePickerCalendar,
} from './DatePicker';
import { Button } from '../Button';
import { cn } from '../../../lib/utils';

export interface ReportDateRangePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const ReportDateRangePicker: FC<ReportDateRangePickerProps> = ({
  label = 'Thời gian',
  value,
  onChange,
  placeholder = 'dd/mm/yyyy hh:mm  ->  dd/mm/yyyy hh:mm',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const formatDate = (d: Date | null): string => {
    if (!d || isNaN(d.getTime())) return '';
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  };

  // Parse string "DD/MM/YYYY HH:mm  ->  DD/MM/YYYY HH:mm" (support ->, →, -)
  const parseRangeDates = (valStr: string) => {
    const fallback = {
      start: new Date(2024, 0, 1),
      end: new Date(2024, 0, 31),
      startTime: '10:30',
      endTime: '11:30',
    };
    if (!valStr) return fallback;

    const delimiter = valStr.includes('->')
      ? '->'
      : valStr.includes('→')
      ? '→'
      : valStr.includes(' - ')
      ? ' - '
      : null;
    if (!delimiter) return fallback;

    try {
      const parts = valStr.split(delimiter).map((s) => s.trim());
      const parsePart = (p: string) => {
        const [dStr, tStr] = p.split(/\s+/);
        if (!dStr) return { date: null, time: '10:30' };
        const [day, month, year] = dStr.split('/').map(Number);
        const d = new Date(year, month - 1, day);
        return {
          date: isNaN(d.getTime()) ? null : d,
          time: tStr || '10:30',
        };
      };

      const p1 = parsePart(parts[0]);
      const p2 = parsePart(parts[1]);
      return {
        start: p1.date || fallback.start,
        end: p2.date || p1.date || fallback.end,
        startTime: p1.time,
        endTime: p2.time,
      };
    } catch {
      return fallback;
    }
  };

  const parsed = useMemo(() => parseRangeDates(value), [value]);

  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>([
    parsed.start,
    parsed.end,
  ]);
  const [startTime, setStartTime] = useState<string>(parsed.startTime);
  const [endTime, setEndTime] = useState<string>(parsed.endTime);

  // Sync internal state when external value changes
  useEffect(() => {
    const p = parseRangeDates(value);
    setSelectedDates([p.start, p.end]);
    setStartTime(p.startTime);
    setEndTime(p.endTime);
  }, [value]);

  // Click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Quick preset ranges
  const presets = useMemo(() => {
    const now = new Date();
    const toStr = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    return [
      {
        id: 'today',
        label: 'Hôm nay',
        value: `${toStr(now)} 00:00  ->  ${toStr(now)} 23:59`,
      },
      {
        id: 'last7days',
        label: '7 ngày qua',
        value: `${toStr(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7))} 00:00  ->  ${toStr(now)} 23:59`,
      },
      {
        id: 'thisMonth',
        label: 'Tháng này',
        value: `${toStr(new Date(now.getFullYear(), now.getMonth(), 1))} 00:00  ->  ${toStr(new Date(now.getFullYear(), now.getMonth() + 1, 0))} 23:59`,
      },
      {
        id: 'lastMonth',
        label: 'Tháng trước',
        value: `${toStr(new Date(now.getFullYear(), now.getMonth() - 1, 1))} 00:00  ->  ${toStr(new Date(now.getFullYear(), now.getMonth(), 0))} 23:59`,
      },
    ];
  }, []);

  const handleSelectPreset = (presetValue: string) => {
    onChange(presetValue);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleApplyCalendar = () => {
    const sDate = selectedDates[0] || new Date();
    const eDate = selectedDates[1] || sDate;
    const [finalStart, finalEnd] =
      sDate.getTime() <= eDate.getTime() ? [sDate, eDate] : [eDate, sDate];

    const formatted = `${formatDate(finalStart)} ${startTime || '10:30'}  ->  ${formatDate(finalEnd)} ${endTime || '11:30'}`;
    onChange(formatted);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleCancel = () => {
    const p = parseRangeDates(value);
    setSelectedDates([p.start, p.end]);
    setStartTime(p.startTime);
    setEndTime(p.endTime);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const isMatchedPreset = (presetVal: string) =>
    value.replace(/\s+/g, '') === presetVal.replace(/\s+/g, '');

  return (
    <div ref={containerRef} className={cn('flex flex-col w-full relative', className)}>
      {label && (
        <label className="text-[14px] font-semibold text-content-main mb-1.5 select-none">
          {label}
        </label>
      )}

      {/* Trigger: Reusable Select-like box with immediate reactive update */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
        className="w-full h-10 px-3 py-2 rounded-lg border border-border hover:border-primary focus:border-primary bg-white flex items-center justify-between cursor-pointer transition-colors select-none text-[13px] text-content-main shadow-2xs outline-none"
      >
        <span className={cn('truncate font-normal', !value && 'text-content-hint')}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-content-hint hover:text-content-main p-0.5 rounded cursor-pointer border-none bg-transparent flex items-center justify-center"
              title="Xóa thời gian"
            >
              <X size={14} />
            </button>
          )}
          <CalendarBlank size={18} className="text-content-hint pointer-events-none" />
        </div>
      </div>

      {/* Dropdown Popup */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 bg-white rounded-xl shadow-xl border border-divide p-3 w-full min-w-[300px] animate-in fade-in-50 duration-150">
          {!showCalendar ? (
            /* Presets View: Unified list under "Khoảng thời gian" without divider & without colored text */
            <div className="w-full p-1 flex flex-col gap-0.5">
              <div className="px-3 py-1.5 text-[11px] font-bold text-content-hint uppercase tracking-wider">
                Khoảng thời gian
              </div>
              {presets.map((preset) => {
                const active = isMatchedPreset(preset.value);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.value)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[13px] transition-colors text-left cursor-pointer border-none bg-transparent',
                      active
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-content-main hover:bg-surface'
                    )}
                  >
                    <span>{preset.label}</span>
                    {active && <Check size={16} className="text-primary font-bold" />}
                  </button>
                );
              })}

              {/* Tùy chọn ngày...: Unified in list, normal text color */}
              <button
                type="button"
                onClick={() => {
                  const p = parseRangeDates(value);
                  setSelectedDates([p.start, p.end]);
                  setStartTime(p.startTime);
                  setEndTime(p.endTime);
                  setShowCalendar(true);
                }}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[13px] text-content-main hover:bg-surface transition-colors text-left cursor-pointer border-none bg-transparent"
              >
                <span>Tùy chọn ngày...</span>
                <ArrowRight size={15} className="text-content-sub" />
              </button>
            </div>
          ) : (
            /* Custom Range View: Reusing DatePicker & DatePickerCalendar components */
            <div className="flex flex-col gap-3 w-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-divide pb-2 px-1">
                <span className="text-sm font-semibold text-content-main">
                  Tùy chọn khoảng ngày
                </span>
                <button
                  type="button"
                  onClick={() => setShowCalendar(false)}
                  className="text-xs text-primary hover:underline font-medium cursor-pointer border-none bg-transparent p-0"
                >
                  Quay lại cài sẵn
                </button>
              </div>

              {/* Start & End Summary Cards with Time Inputs */}
              <div className="grid grid-cols-2 gap-2 bg-surface p-2 rounded-lg border border-border/60">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium text-content-sub">Từ ngày:</span>
                  <div className="text-[12px] font-semibold text-content-main">
                    {formatDate(selectedDates[0]) || 'Chọn ngày'}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="text-content-hint" />
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="10:30"
                      className="w-14 text-[11px] px-1.5 py-0.5 rounded border border-border bg-white text-content-main outline-none focus:border-primary text-center"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 border-l border-divide pl-2">
                  <span className="text-[11px] font-medium text-content-sub">Đến ngày:</span>
                  <div className="text-[12px] font-semibold text-content-main">
                    {selectedDates[1]
                      ? formatDate(selectedDates[1])
                      : selectedDates[0]
                      ? 'Chọn ngày kết thúc'
                      : 'Chọn ngày'}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="text-content-hint" />
                    <input
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      placeholder="11:30"
                      className="w-14 text-[11px] px-1.5 py-0.5 rounded border border-border bg-white text-content-main outline-none focus:border-primary text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Reusable DatePickerCalendar: Includes quick month/year selection & range highlighting */}
              <DatePicker
                selectionMode="range"
                value={selectedDates}
                onValueChange={(e: any) => {
                  if (e?.value) {
                    setSelectedDates(Array.isArray(e.value) ? e.value : [e.value, null]);
                  }
                }}
                className="w-full flex justify-center"
              >
                <DatePickerPanel className="w-full">
                  <DatePickerBody className="w-full justify-center">
                    <DatePickerCalendar className="w-full" />
                  </DatePickerBody>
                </DatePickerPanel>
              </DatePicker>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-divide pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                  className="text-xs h-8 px-3"
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  type="button"
                  onClick={handleApplyCalendar}
                  className="text-xs h-8 px-3 text-white bg-primary hover:bg-turquoise-700 font-medium"
                >
                  Áp dụng
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
