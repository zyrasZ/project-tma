'use client';

import { cn } from '../../../lib/utils';
import { CaretDown as ChevronDown, CaretLeft as ChevronLeft, CaretRight as ChevronRight, CaretUp as ChevronUp } from '@phosphor-icons/react';
import type { UseDatePickerMonthData, UseDatePickerMonthOptions, UseDatePickerYearOptions } from '@primereact/types/headless/datepicker';
import type {
    DatePickerBodyProps,
    DatePickerCalendarProps,
    DatePickerInputProps,
    DatePickerPanelProps,
    DatePickerPopupProps,
    DatePickerPortalProps,
    DatePickerPositionerProps,
    DatePickerRootProps,
    DatePickerTimeProps
} from '@primereact/types/primitive/datepicker';
import { DatePickerDay, DatePicker as PRDatePicker, useDatePickerContext } from 'primereact/datepicker';
import * as React from 'react';
import { buttonVariants } from '../Button';
import { inputVariants as inputTextVariants } from '../Input/Input';

export interface DatePickerProps extends Omit<DatePickerRootProps, 'size' | 'variant'> {}

const selectButtonClass = `inline-flex items-center justify-center border-0 bg-transparent cursor-pointer
    !px-1.5 !py-1 !rounded text-sm font-medium text-content-main
    transition-colors duration-150
    hover:bg-surface
    focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary`;

function DayTableHead() {
    const datepicker = useDatePickerContext();
    const weekDays = (datepicker?.weekDays ?? []) as string[];
    const showWeek = !!datepicker?.props.showWeek;
    const weekHeaderLabel = datepicker?.weekHeaderLabel as string | undefined;

    return (
        <PRDatePicker.TableHeadRow>
            {showWeek && (
                <PRDatePicker.TableHeadWeekCell className="p-1 text-xs font-normal text-content-sub opacity-60">
                    <span className="block text-center">{weekHeaderLabel}</span>
                </PRDatePicker.TableHeadWeekCell>
            )}
            {weekDays.map((day, index) => (
                <PRDatePicker.TableHeadCell key={index} abbr={day} className="p-1 text-xs font-normal text-content-sub">
                    <PRDatePicker.TableHeadWeekLabel className="block text-center">{day}</PRDatePicker.TableHeadWeekLabel>
                </PRDatePicker.TableHeadCell>
            ))}
        </PRDatePicker.TableHeadRow>
    );
}

function DayTableBody({ index = 0 }: { index?: number }) {
    const datepicker = useDatePickerContext();
    const month = datepicker?.getIndexedMonth?.(index) as UseDatePickerMonthData;
    const showWeek = !!datepicker?.props.showWeek;

    return (
        <>
            {month?.dates?.map((week, weekIndex) => (
                <PRDatePicker.TableBodyRow key={weekIndex}>
                    {showWeek && (
                        <PRDatePicker.TableBodyWeekCell className="py-px opacity-60">
                            <PRDatePicker.TableBodyWeekLabel className="flex items-center justify-center size-9 mx-auto text-sm font-normal text-content-main">{month?.weekNumbers?.[weekIndex]}</PRDatePicker.TableBodyWeekLabel>
                        </PRDatePicker.TableBodyWeekCell>
                    )}
                    {week.map((date) => (
                        <PRDatePicker.TableBodyCell key={date.day + '' + date.month} date={date} className="py-px">
                            <span
                                className={`flex items-center justify-center w-full h-9 transition-colors
                                has-[[data-in-range]]:bg-primary/15
                                has-[[data-in-hover-range]]:bg-primary/10
                                has-[[data-range-start]]:bg-primary/15 has-[[data-range-start]]:rounded-l-full
                                has-[[data-range-end]]:bg-primary/15 has-[[data-range-end]]:rounded-r-full
                                has-[[data-range-pending]]:bg-transparent
                                has-[[data-range-start][data-range-end]]:bg-transparent
                                [td:first-child_&]:rounded-l-full
                                [td:last-child_&]:rounded-r-full`}
                            >
                                <DatePickerDay
                                    className={`relative flex items-center justify-center size-9 mx-auto rounded-full cursor-pointer
                                    text-content-main select-none transition-colors duration-100 text-sm font-normal
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                                    hover:bg-surface
                                    data-[outside]:text-content-hint/40
                                    data-[disabled]:opacity-30 data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-transparent
                                    data-[today]:after:content-[''] data-[today]:after:absolute data-[today]:after:bottom-1 data-[today]:after:left-1/2 data-[today]:after:-translate-x-1/2 data-[today]:after:w-1 data-[today]:after:h-1 data-[today]:after:rounded-full data-[today]:after:bg-primary
                                    data-[selected]:!bg-primary data-[selected]:!text-white data-[selected]:font-semibold data-[selected]:hover:!bg-turquoise-700
                                    data-[selected]:data-[today]:after:!bg-white
                                    data-[range-start]:!bg-primary data-[range-start]:!text-white data-[range-start]:font-semibold data-[range-start]:hover:!bg-turquoise-700
                                    data-[range-end]:!bg-primary data-[range-end]:!text-white data-[range-end]:font-semibold data-[range-end]:hover:!bg-turquoise-700
                                    data-[hover-range-start]:!bg-primary data-[hover-range-start]:!text-white data-[hover-range-start]:hover:!bg-turquoise-700
                                    data-[hover-range-end]:!bg-primary data-[hover-range-end]:!text-white data-[hover-range-end]:hover:!bg-turquoise-700
                                    data-[in-range]:!bg-primary/15 data-[in-range]:!text-primary data-[in-range]:!rounded-none data-[in-range]:font-medium
                                    data-[in-hover-range]:!bg-primary/10 data-[in-hover-range]:!rounded-none`}
                                />
                            </span>
                        </PRDatePicker.TableBodyCell>
                    ))}
                </PRDatePicker.TableBodyRow>
            ))}
        </>
    );
}

const monthYearButtonClass = `flex items-center justify-center !w-full h-9 mx-auto !rounded-md cursor-pointer text-sm font-normal !p-0
    text-content-main transition-colors duration-150
    hover:bg-surface
    data-[selected]:!bg-primary data-[selected]:!text-white data-[selected]:font-semibold data-[selected]:hover:!bg-turquoise-700
    data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed
    focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary`;

function MonthTableBody() {
    const datepicker = useDatePickerContext();
    const months = (datepicker?.monthPickerValues ?? []) as UseDatePickerMonthOptions[];

    return (
        <>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
                <PRDatePicker.TableBodyRow key={`month-row-${rowIndex}`}>
                    {months?.slice(rowIndex * 3, (rowIndex + 1) * 3).map((month, colIndex) => {
                        const monthIndex = rowIndex * 3 + colIndex;

                        return (
                            <PRDatePicker.TableBodyCell key={monthIndex} month={month} index={monthIndex} className="p-1 w-1/3">
                                <PRDatePicker.Month className={monthYearButtonClass} />
                            </PRDatePicker.TableBodyCell>
                        );
                    })}
                </PRDatePicker.TableBodyRow>
            ))}
        </>
    );
}

function YearTableBody() {
    const datepicker = useDatePickerContext();
    const years = (datepicker?.yearPickerValues ?? []) as UseDatePickerYearOptions[];

    return (
        <>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
                <PRDatePicker.TableBodyRow key={`year-row-${rowIndex}`}>
                    {years?.slice(rowIndex * 2, (rowIndex + 1) * 2).map((year, colIndex) => {
                        const yearIndex = rowIndex * 2 + colIndex;

                        return (
                            <PRDatePicker.TableBodyCell key={yearIndex} year={year} className="p-1 w-1/2">
                                <PRDatePicker.Year className={monthYearButtonClass} />
                            </PRDatePicker.TableBodyCell>
                        );
                    })}
                </PRDatePicker.TableBodyRow>
            ))}
        </>
    );
}

function DatePicker({ className, fluid, invalid, disabled, children, ...rootProps }: DatePickerProps & { fluid?: boolean; invalid?: boolean; disabled?: boolean; children?: React.ReactNode }) {
    return (
        <PRDatePicker.Root
            className={cn('relative inline-flex max-w-full', fluid && 'w-full', disabled && 'opacity-60 **:pointer-events-none **:select-none', className)}
            fluid={fluid as boolean | undefined}
            disabled={disabled}
            data-invalid={invalid ? '' : undefined}
            {...rootProps}
        >
            {children}
        </PRDatePicker.Root>
    );
}

function DatePickerInput({ className, invalid, disabled, placeholder = 'mm/dd/yy', ...props }: DatePickerInputProps & { invalid?: boolean }) {
    return (
        <PRDatePicker.Input
            placeholder={placeholder}
            disabled={disabled}
            className={cn(inputTextVariants({ hasError: invalid, isDisabled: disabled }), invalid && 'border-alert placeholder:text-alert', className)}
            {...props}
        />
    );
}

function DatePickerPortal({ ...props }: DatePickerPortalProps) {
    return <PRDatePicker.Portal {...props} />;
}

function DatePickerPositioner({ sideOffset = 4, ...props }: DatePickerPositionerProps) {
    return <PRDatePicker.Positioner sideOffset={sideOffset} {...props} />;
}

function DatePickerPopup({ className, ...props }: DatePickerPopupProps) {
    return (
        <PRDatePicker.Popup
            className={cn(
                `rounded-lg p-2 min-w-(--px-positioner-anchor-width)
                bg-white dark:bg-surface-900
                border border-border dark:border-surface-700
                text-content-main dark:text-surface-0
                shadow-md
                origin-(--px-transform-origin)
                data-enter-from:opacity-0 data-enter-from:scale-[0.93]
                data-leave-to:opacity-0 data-leave-to:scale-[0.93]
                transition-[opacity,scale] duration-150 ease-out will-change-transform
                `,
                className
            )}
            {...props}
        />
    );
}

function DatePickerBody({ className, ...props }: DatePickerBodyProps) {
    return <PRDatePicker.Body className={cn('flex flex-wrap gap-4', className)} {...props} />;
}

function DatePickerPanel({ className, ...props }: DatePickerPanelProps) {
    return <PRDatePicker.Panel className={cn('flex flex-col', className)} {...props} />;
}

const timeChevronButtonClass = buttonVariants({
    variant: 'text',
    iconOnly: true,
    size: 'sm'
});

const timeFieldClass = `inline-flex items-center justify-center min-w-9 px-2 h-8 rounded-md text-sm font-medium tabular-nums
    text-content-main dark:text-surface-0 bg-surface dark:bg-surface-800/60`;

const timeSeparatorClass = `inline-flex items-center justify-center px-0.5 text-sm font-semibold text-content-hint dark:text-surface-400 select-none`;

function TimePicker({ type, children }: { type: 'hour' | 'minute' | 'second' | 'ampm'; children: React.ReactNode }) {
    return (
        <PRDatePicker.Picker type={type} className="flex flex-col items-center gap-0.5">
            <PRDatePicker.Increment className={timeChevronButtonClass}>
                <ChevronUp />
            </PRDatePicker.Increment>
            {children}
            <PRDatePicker.Decrement className={timeChevronButtonClass}>
                <ChevronDown />
            </PRDatePicker.Decrement>
        </PRDatePicker.Picker>
    );
}

function DatePickerTime({ className, ...props }: DatePickerTimeProps) {
    const datepicker = useDatePickerContext();
    const showSeconds = !!datepicker?.props.showSeconds;
    const showAmPm = datepicker?.props.hourFormat === '12';
    const timeOnly = !!datepicker?.props.timeOnly;

    return (
        <PRDatePicker.Time className={cn('flex items-center justify-center gap-1', !timeOnly && '-mx-2 px-2 mt-2 pt-3 border-t border-border dark:border-surface-700', className)} {...props}>
            <TimePicker type="hour">
                <PRDatePicker.Hour className={timeFieldClass} />
            </TimePicker>

            <PRDatePicker.Separator className={timeSeparatorClass}>:</PRDatePicker.Separator>

            <TimePicker type="minute">
                <PRDatePicker.Minute className={timeFieldClass} />
            </TimePicker>

            {showSeconds && (
                <>
                    <PRDatePicker.Separator className={timeSeparatorClass}>:</PRDatePicker.Separator>
                    <TimePicker type="second">
                        <PRDatePicker.Second className={timeFieldClass} />
                    </TimePicker>
                </>
            )}

            {showAmPm && (
                <>
                    <PRDatePicker.Separator className={cn(timeSeparatorClass, 'opacity-0')}>·</PRDatePicker.Separator>
                    <TimePicker type="ampm">
                        <PRDatePicker.AmPm className={timeFieldClass} />
                    </TimePicker>
                </>
            )}
        </PRDatePicker.Time>
    );
}

interface DatePickerCalendarProps2 extends DatePickerCalendarProps {
    index?: number;
}

function DatePickerCalendar({ className, index = 0, ...props }: DatePickerCalendarProps2) {
    const datepicker = useDatePickerContext();
    const monthName = datepicker?.getMonthName?.(datepicker?.getIndexedMonth?.(index)?.month ?? 0);
    const monthYear = datepicker?.getIndexedMonth?.(index)?.year;
    const numberOfMonths = (datepicker?.props.numberOfMonths as number) ?? 1;
    const showPrev = index === 0;
    const showNext = index === numberOfMonths - 1;

    return (
        <PRDatePicker.Calendar className={cn('flex flex-col flex-1 min-w-64', className)} {...props}>
            <PRDatePicker.Header className="flex items-center justify-between text-content-main dark:text-surface-0">
                {showPrev ? (
                    <PRDatePicker.Prev
                        className={buttonVariants({
                            variant: 'text',
                            iconOnly: true,
                            size: 'sm'
                        })}
                    >
                        <ChevronLeft />
                    </PRDatePicker.Prev>
                ) : (
                    <span className="size-7" />
                )}
                <PRDatePicker.Title className="flex items-center justify-between gap-0.5">
                    {numberOfMonths > 1 ? (
                        <>
                            <span className="px-1.5 py-1 font-medium text-sm">{monthName}</span>
                            <span className="px-1.5 py-1 font-medium text-sm">{monthYear}</span>
                        </>
                    ) : (
                        <>
                            <PRDatePicker.SelectMonth className={selectButtonClass} />
                            <PRDatePicker.SelectYear className={selectButtonClass} />
                            <PRDatePicker.Decade className="text-content-main dark:text-surface-0 text-sm font-medium" />
                        </>
                    )}
                </PRDatePicker.Title>
                {showNext ? (
                    <PRDatePicker.Next
                        className={buttonVariants({
                            variant: 'text',
                            iconOnly: true,
                            size: 'sm'
                        })}
                    >
                        <ChevronRight />
                    </PRDatePicker.Next>
                ) : (
                    <span className="size-7" />
                )}
            </PRDatePicker.Header>

            <PRDatePicker.Table className="w-full border-collapse mt-2">
                <PRDatePicker.TableHead>
                    <DayTableHead />
                </PRDatePicker.TableHead>
                <PRDatePicker.TableBody index={index}>
                    <DayTableBody index={index} />
                </PRDatePicker.TableBody>
                {index === 0 && (
                    <>
                        <PRDatePicker.TableBody view="month">
                            <MonthTableBody />
                        </PRDatePicker.TableBody>
                        <PRDatePicker.TableBody view="year">
                            <YearTableBody />
                        </PRDatePicker.TableBody>
                    </>
                )}
            </PRDatePicker.Table>
        </PRDatePicker.Calendar>
    );
}

export { DatePicker, DatePickerBody, DatePickerCalendar, DatePickerInput, DatePickerPanel, DatePickerPopup, DatePickerPortal, DatePickerPositioner, DatePickerTime };
