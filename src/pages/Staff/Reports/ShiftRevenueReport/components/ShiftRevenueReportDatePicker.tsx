import { FC, useState, useRef, useEffect } from 'react';
import { CalendarBlank, X } from '@phosphor-icons/react';
import {
  DatePicker,
  DatePickerPanel,
  DatePickerBody,
  DatePickerCalendar,
} from '../../../../../components/ui/DatePicker';
import { cn } from '../../../../../lib/utils';

interface ShiftRevenueReportDatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const ShiftRevenueReportDatePicker: FC<ShiftRevenueReportDatePickerProps> = ({
  label = 'Ngày bắt đầu',
  value,
  onChange,
  placeholder = 'dd/mm/yyyy',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Parse dd/mm/yyyy to Date
  const parseDate = (valStr: string): Date | null => {
    if (!valStr || !valStr.includes('/')) return null;
    const parts = valStr.split('/').map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    return null;
  };

  const selectedDate = parseDate(value);

  const handleSelectDate = (e: any) => {
    if (e?.value) {
      const d = e.value as Date;
      if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        onChange(`${day}/${month}/${year}`);
        setIsOpen(false);
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={cn('flex flex-col relative', className)} ref={containerRef}>
      {label && (
        <label className="text-[14px] font-semibold text-content-main mb-1.5 flex items-center">
          {label}
        </label>
      )}

      {/* Input Field trigger */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen((prev) => !prev);
          }
        }}
        className={cn(
          'w-full h-10 rounded-lg outline-none transition-colors duration-200 border bg-white flex items-center justify-between px-3 cursor-pointer select-none',
          isOpen ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary'
        )}
      >
        <span className={cn('text-sm truncate', value ? 'text-content-main font-medium' : 'text-content-hint')}>
          {value || placeholder}
        </span>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-content-hint hover:text-content-main p-0.5 rounded cursor-pointer border-none bg-transparent"
              title="Xóa ngày"
            >
              <X size={14} />
            </button>
          )}
          <CalendarBlank size={18} className="text-content-hint pointer-events-none" />
        </div>
      </div>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white rounded-xl shadow-xl border border-divide p-3 min-w-[280px] animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between border-b border-divide pb-2 px-1 mb-2">
            <span className="text-xs font-semibold text-content-main">Chọn ngày</span>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                onChange(`${day}/${month}/${year}`);
                setIsOpen(false);
              }}
              className="text-xs text-primary hover:underline font-medium cursor-pointer border-none bg-transparent p-0"
            >
              Hôm nay
            </button>
          </div>

          <DatePicker
            selectionMode="single"
            value={selectedDate}
            onValueChange={handleSelectDate}
            className="w-full flex justify-center"
          >
            <DatePickerPanel className="w-full">
              <DatePickerBody className="w-full justify-center">
                <DatePickerCalendar className="w-full" />
              </DatePickerBody>
            </DatePickerPanel>
          </DatePicker>
        </div>
      )}
    </div>
  );
};
