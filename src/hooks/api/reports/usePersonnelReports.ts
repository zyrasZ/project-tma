import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import { personnelReportApi } from '../../../api/personnelReport.api';
import type { GetPersonnelReportParams } from '../../../types/personnelReport';

export const PERSONNEL_REPORTS_QUERY_KEY = ['personnelReports'];

export const useGetPersonnelReports = (params?: GetPersonnelReportParams) => {
  return useQuery({
    queryKey: [...PERSONNEL_REPORTS_QUERY_KEY, params],
    queryFn: () => personnelReportApi.getPersonnelReports(params),
    placeholderData: keepPreviousData,
  });
};

export const useExportPersonnelXlsx = () => {
  return useMutation({
    mutationFn: () => personnelReportApi.exportXlsx(),
  });
};

export const useExportPersonnelPdf = () => {
  return useMutation({
    mutationFn: () => personnelReportApi.exportPdf(),
  });
};
