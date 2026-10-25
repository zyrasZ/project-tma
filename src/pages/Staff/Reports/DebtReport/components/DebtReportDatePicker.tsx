import { FC } from 'react';
import {
  ReportDateRangePicker,
  type ReportDateRangePickerProps,
} from '../../../../../components/ui/DatePicker';

export type DebtReportDatePickerProps = ReportDateRangePickerProps;

export const DebtReportDatePicker: FC<DebtReportDatePickerProps> = (props) => {
  return <ReportDateRangePicker {...props} />;
};
