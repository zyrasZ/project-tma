import { debtReportsMock, debtSummaryMock } from '../mocks/debtReports.mock';
import type {
  GetDebtReportParams,
  GetDebtReportResponse,
  DebtReportSummary,
} from '../types/debtReport';

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

export const debtReportApi = {
  getDebtReports: async (
    params?: GetDebtReportParams
  ): Promise<GetDebtReportResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...debtReportsMock];

        // 1. Filter by Customer
        if (params?.customerId && params.customerId !== 'all') {
          filtered = filtered.filter((item) => item.customerId === params.customerId);
        }

        // 2. Filter by Search Query
        if (params?.search && params.search.trim() !== '') {
          const s = params.search.toLowerCase().trim();
          filtered = filtered.filter(
            (item) =>
              item.id.toLowerCase().includes(s) ||
              item.buyerName?.toLowerCase().includes(s) ||
              item.product?.toLowerCase().includes(s) ||
              item.station?.toLowerCase().includes(s) ||
              item.email?.toLowerCase().includes(s)
          );
        }

        // 3. Filter by Date Range (e.g. "01/01/2024 10:30  ->  31/01/2024 11:30")
        if (params?.dateRange && params.dateRange.trim() !== '') {
          const range = params.dateRange.trim();
          const delimiter = range.includes('->')
            ? '->'
            : range.includes('→')
            ? '→'
            : ' - ';
          const parts = range.split(delimiter).map((s) => s.trim());
          const startTime = parseDateTime(parts[0], 0, 0);
          const endTime = parts[1]
            ? parseDateTime(parts[1], 23, 59) + 59999
            : startTime + 86399999;

          if (startTime && endTime) {
            filtered = filtered.filter((item) => {
              const itemTime = parseDateTime(item.time, 0, 0);
              return itemTime >= startTime && itemTime <= endTime;
            });
          }
        }

        // Calculate dynamic summary based on filtered items
        const parseAmount = (amtStr?: string) => {
          if (!amtStr) return 0;
          const clean = amtStr.replace(/\./g, '').replace(/,/g, '');
          return parseInt(clean, 10) || 0;
        };

        const totalDebt = filtered
          .filter((i) => i.type === 'debt')
          .reduce((sum, i) => sum + Math.abs(parseAmount(i.amount)), 0);

        const totalPaid = filtered
          .filter((i) => i.type === 'payment')
          .reduce((sum, i) => sum + Math.abs(parseAmount(i.amount)), 0);

        const summary: DebtReportSummary = {
          debtInPeriod:
            totalDebt > 0 ? `-${totalDebt.toLocaleString('vi-VN')}đ` : '0đ',
          paidInPeriod:
            totalPaid > 0 ? `${totalPaid.toLocaleString('vi-VN')}đ` : '0đ',
        };

        const total = filtered.length;
        const first = params?.first || 0;
        const rows = params?.rows || 10;
        const data = filtered.slice(first, first + rows);

        resolve({
          data,
          summary,
          total,
        });
      }, 300);
    });
  },

  exportXlsx: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `BaoCaoCongNo_${new Date().toISOString().slice(0, 10)}.xlsx`,
        });
      }, 500);
    });
  },

  exportPdf: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `BaoCaoCongNo_${new Date().toISOString().slice(0, 10)}.pdf`,
        });
      }, 500);
    });
  },
};
