import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import { shiftRevenueReportApi } from '../../../api/shiftRevenueReport.api';
import type { GetShiftRevenueReportParams } from '../../../types/shiftRevenueReport';

export const SHIFT_REVENUE_REPORTS_QUERY_KEY = ['shiftRevenueReports'];

export const useGetShiftRevenueReports = (params?: GetShiftRevenueReportParams) => {
  return useQuery({
    queryKey: [...SHIFT_REVENUE_REPORTS_QUERY_KEY, params],
    queryFn: () => shiftRevenueReportApi.getShiftRevenueReports(params),
    placeholderData: keepPreviousData,
  });
};

export const useExportShiftRevenueXlsx = () => {
  return useMutation({
    mutationFn: () => shiftRevenueReportApi.exportXlsx(),
  });
};

export const useExportShiftRevenuePdf = () => {
  return useMutation({
    mutationFn: () => shiftRevenueReportApi.exportPdf(),
  });
};
