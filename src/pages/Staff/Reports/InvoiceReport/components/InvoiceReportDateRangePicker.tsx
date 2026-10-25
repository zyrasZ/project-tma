import { FC } from 'react';
import {
  ReportDateRangePicker,
  type ReportDateRangePickerProps,
} from '../../../../../components/ui/DatePicker';

export type InvoiceReportDateRangePickerProps = ReportDateRangePickerProps;

export const InvoiceReportDateRangePicker: FC<InvoiceReportDateRangePickerProps> = (props) => {
  return <ReportDateRangePicker {...props} />;
};
