import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import { debtReportApi } from '../../../api/debtReport.api';
import type { GetDebtReportParams } from '../../../types/debtReport';

export const DEBT_REPORTS_QUERY_KEY = ['debtReports'];

export const useGetDebtReports = (params?: GetDebtReportParams) => {
  return useQuery({
    queryKey: [...DEBT_REPORTS_QUERY_KEY, params],
    queryFn: () => debtReportApi.getDebtReports(params),
    placeholderData: keepPreviousData,
  });
};

export const useExportDebtXlsx = () => {
  return useMutation({
    mutationFn: () => debtReportApi.exportXlsx(),
  });
};

export const useExportDebtPdf = () => {
  return useMutation({
    mutationFn: () => debtReportApi.exportPdf(),
  });
};
