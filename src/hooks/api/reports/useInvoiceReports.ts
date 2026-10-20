import { useQuery, useMutation } from '@tanstack/react-query';
import { invoiceReportApi } from '../../../api/invoiceReport.api';
import type { GetInvoiceReportParams } from '../../../types/invoiceReport';

export const INVOICE_REPORTS_QUERY_KEY = ['invoiceReports'];

export const useGetInvoiceReports = (params?: GetInvoiceReportParams) => {
  return useQuery({
    queryKey: [...INVOICE_REPORTS_QUERY_KEY, params],
    queryFn: () => invoiceReportApi.getInvoiceReports(params),
  });
};

export const useExportInvoiceReportXlsx = () => {
  return useMutation({
    mutationFn: () => invoiceReportApi.exportXlsx(),
  });
};

export const useExportInvoiceReportPdf = () => {
  return useMutation({
    mutationFn: () => invoiceReportApi.exportPdf(),
  });
};
