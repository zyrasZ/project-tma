import {
  invoiceReportsMock,
} from '../mocks/invoiceReports.mock';
import type {
  GetInvoiceReportParams,
  GetInvoiceReportResponse,
} from '../types/invoiceReport';

export const invoiceReportApi = {
  getInvoiceReports: async (params?: GetInvoiceReportParams): Promise<GetInvoiceReportResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...invoiceReportsMock];

        // 1. Filter by Station
        if (params?.stationId && params.stationId !== 'all') {
          filtered = filtered.filter(item => item.stationId === params.stationId);
        }

        // 2. Filter by Fuel Type
        if (params?.fuelType && params.fuelType !== 'all') {
          filtered = filtered.filter(item => item.fuelType === params.fuelType);
        }

        // 3. Filter by Status
        if (params?.status && params.status !== 'all' && params.status.trim() !== '') {
          filtered = filtered.filter(item => item.status === params.status);
        }

        // 4. Filter by Search Query
        if (params?.search && params.search.trim() !== '') {
          const s = params.search.toLowerCase().trim();
          filtered = filtered.filter(item =>
            item.pumpCode.toLowerCase().includes(s) ||
            item.customerCode.toLowerCase().includes(s) ||
            item.buyerName.toLowerCase().includes(s) ||
            item.customerName.toLowerCase().includes(s) ||
            item.taxCode.toLowerCase().includes(s) ||
            item.email.toLowerCase().includes(s) ||
            item.fuelType.toLowerCase().includes(s)
          );
        }

        // 5. Filter by Date Range (if provided)
        const hasDateRange =
          params?.dateRange &&
          (params.dateRange.includes('->') ||
            params.dateRange.includes('→') ||
            params.dateRange.includes(' - '));

        if (hasDateRange) {
          const delimiter = params!.dateRange!.includes('->')
            ? '->'
            : params!.dateRange!.includes('→')
            ? '→'
            : ' - ';
          const parts = params!.dateRange!.split(delimiter).map(s => s.trim());
          const parseDateTime = (str: string) => {
            try {
              const [dPart, tPart] = str.split(' ');
              if (!dPart) return 0;
              let day = 1, month = 1, year = 2024;
              if (dPart.includes('/')) {
                const pieces = dPart.split('/').map(Number);
                day = pieces[0];
                month = pieces[1];
                year = pieces[2];
              } else if (dPart.includes('-')) {
                const pieces = dPart.split('-').map(Number);
                year = pieces[0];
                month = pieces[1];
                day = pieces[2];
              }
              const [hh, mm] = (tPart || '00:00').split(':').map(Number);
              return new Date(year, month - 1, day, hh || 0, mm || 0).getTime();
            } catch {
              return 0;
            }
          };

          const startTime = parseDateTime(parts[0]);
          const endTime = parseDateTime(parts[1]) + 59999;

          if (startTime && endTime) {
            const isDefaultSampleRange = Boolean(
              params?.dateRange?.includes('01/01/2024') && params?.dateRange?.includes('31/01/2024')
            );

            if (!isDefaultSampleRange) {
              const sDate = parts[0].split(' ')[0] || '';

              // Filter or adapt records to the chosen date range
              filtered = filtered.map((item, idx) => {
                const formattedPumpDate = `${sDate} 16:${(20 + idx * 3).toString().padStart(2, '0')}`;
                return {
                  ...item,
                  pumpDate: formattedPumpDate,
                  createdDate: formattedPumpDate,
                  createdAt: formattedPumpDate,
                };
              });
            }
          }
        } else if (params?.fromDate && params?.toDate) {
          filtered = filtered.filter(item => {
            if (!item.createdAt) return true;
            return item.createdAt >= params.fromDate! && item.createdAt <= params.toDate!;
          });
        }

        // Calculate status counts on the scoped dataset (reflecting station, date range, search, fuel)
        const scopedIssued = filtered.filter(item => item.status === 'issued').length;
        const scopedPending = filtered.filter(item => item.status === 'pending').length;
        const scopedError = filtered.filter(item => item.status === 'error').length;
        const scopedFlagged = filtered.filter(item => item.status === 'flagged').length;

        // 6. Filter by Status (if specified)
        const filterStatus = params?.status?.trim();
        const isStatusFiltered = Boolean(filterStatus && filterStatus !== 'all');
        if (isStatusFiltered && filterStatus) {
          filtered = filtered.filter(item => item.status === filterStatus);
        }

        const total = filtered.length;

        // Stats dynamically and accurately reflect the filtered dataset
        const stats = {
          issuedCount: isStatusFiltered ? (filterStatus === 'issued' ? total : 0) : scopedIssued,
          pendingCount: isStatusFiltered ? (filterStatus === 'pending' ? total : 0) : scopedPending,
          errorCount: isStatusFiltered ? (filterStatus === 'error' ? total : 0) : scopedError,
          flaggedCount: isStatusFiltered ? (filterStatus === 'flagged' ? total : 0) : scopedFlagged,
        };

        // Ensure full column fields exist on all records
        filtered = filtered.map(item => ({
          unit: 'Lít',
          quantity: '8,11',
          unitPrice: '25.138',
          subtotal: '110.505',
          taxRate: '10%',
          taxAmount: '10.500',
          totalAmount: '115.000',
          paymentMethod: 'TM/CK',
          formNumber: '1',
          symbol: 'K24TYY',
          pumpDate: item.createdAt || '06/11/2023 16:48',
          createdDate: item.createdAt || '06/11/2023 16:48',
          ...item,
        }));

        // Apply Pagination slice
        if (params?.first !== undefined && params?.rows !== undefined) {
          filtered = filtered.slice(params.first, params.first + params.rows);
        }

        resolve({
          data: filtered,
          total,
          stats,
        });
      }, 200);
    });
  },

  exportXlsx: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `Bao_cao_hoa_don_${new Date().toISOString().slice(0, 10)}.xlsx`,
        });
      }, 400);
    });
  },

  exportPdf: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `Bao_cao_hoa_don_${new Date().toISOString().slice(0, 10)}.pdf`,
        });
      }, 400);
    });
  },
};
