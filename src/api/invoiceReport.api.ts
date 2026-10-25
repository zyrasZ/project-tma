import {
  invoiceReportsMock,
} from '../mocks/invoiceReports.mock';
import type {
  GetInvoiceReportParams,
  GetInvoiceReportResponse,
} from '../types/invoiceReport';

const parseDateTime = (str: string, defaultHour = 0, defaultMin = 0): number => {
  try {
    const trimmed = str.trim();
    if (!trimmed) return 0;
    const [dPart, tPart] = trimmed.split(/\s+/);
    if (!dPart) return 0;

    let day = 1,
      month = 1,
      year = 2024;
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

    let hh = defaultHour;
    let mm = defaultMin;
    if (tPart && tPart.includes(':')) {
      const [h, m] = tPart.split(':').map(Number);
      hh = isNaN(h) ? defaultHour : h;
      mm = isNaN(m) ? defaultMin : m;
    }

    const d = new Date(year, month - 1, day, hh, mm, 0, 0);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  } catch {
    return 0;
  }
};

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

        // 3. Filter by Search Query
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

        // 4. Filter by Date Range (if provided)
        if (params?.dateRange && params.dateRange.trim() !== '') {
          const range = params.dateRange.trim();
          const delimiter = range.includes('->')
            ? '->'
            : range.includes('→')
            ? '→'
            : ' - ';
          const parts = range.split(delimiter).map(s => s.trim());
          const startTime = parseDateTime(parts[0], 0, 0);
          const endTime = parts[1]
            ? parseDateTime(parts[1], 23, 59) + 59999
            : startTime + 86399999;

          if (startTime && endTime) {
            filtered = filtered.filter(item => {
              const itemDateStr = item.pumpDate || item.createdDate || item.createdAt || '';
              const itemTime = parseDateTime(itemDateStr, 0, 0);
              return itemTime >= startTime && itemTime <= endTime;
            });
          }
        } else if (params?.fromDate && params?.toDate) {
          const startTime = parseDateTime(params.fromDate, 0, 0);
          const endTime = parseDateTime(params.toDate, 23, 59) + 59999;
          filtered = filtered.filter(item => {
            const itemDateStr = item.pumpDate || item.createdDate || item.createdAt || '';
            const itemTime = parseDateTime(itemDateStr, 0, 0);
            return itemTime >= startTime && itemTime <= endTime;
          });
        }

        // Calculate status counts on the scoped dataset (reflecting station, date range, search, fuel)
        const scopedIssued = filtered.filter(item => item.status === 'issued').length;
        const scopedPending = filtered.filter(item => item.status === 'pending').length;
        const scopedError = filtered.filter(item => item.status === 'error').length;
        const scopedFlagged = filtered.filter(item => item.status === 'flagged').length;

        // 5. Filter by Status (if specified)
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
          pumpDate: '06/11/2023 16:48',
          createdDate: '06/11/2023 16:48',
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
