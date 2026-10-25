import { shiftRevenueReportsMock } from '../mocks/shiftRevenueReports.mock';
import type {
  GetShiftRevenueReportParams,
  GetShiftRevenueReportResponse,
  ShiftRevenueSummary,
} from '../types/shiftRevenueReport';

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

export const shiftRevenueReportApi = {
  getShiftRevenueReports: async (
    params?: GetShiftRevenueReportParams
  ): Promise<GetShiftRevenueReportResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...shiftRevenueReportsMock];

        // 1. Filter by Station
        if (params?.stationId && params.stationId !== 'all') {
          filtered = filtered.filter((item) => item.stationId === params.stationId);
        }

        // 2. Filter by Shift
        if (params?.shiftName && params.shiftName !== 'all') {
          filtered = filtered.filter((item) =>
            item.shiftName?.toLowerCase().includes(params.shiftName!.toLowerCase())
          );
        }

        // 3. Filter by Search Query
        if (params?.search && params.search.trim() !== '') {
          const s = params.search.toLowerCase().trim();
          filtered = filtered.filter(
            (item) =>
              item.id.toLowerCase().includes(s) ||
              item.staffName?.toLowerCase().includes(s) ||
              item.stationName.toLowerCase().includes(s)
          );
        }

        // 4. Filter by Start Date (e.g. "23/10/2026")
        if (params?.startDate && params.startDate.trim() !== '') {
          const trimmedStart = params.startDate.trim();
          const dateOnly = trimmedStart.split(' ')[0];
          filtered = filtered.filter((item) => {
            const itemDate = item.startDate?.split(' ')[0] || '';
            return itemDate === dateOnly;
          });
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
          const parts = params!.dateRange!.split(delimiter).map((s) => s.trim());
          const startTime = parseDateTime(parts[0], 0, 0);
          const endTime = parts[1]
            ? parseDateTime(parts[1], 23, 59) + 59999
            : startTime + 86399999;

          if (startTime && endTime) {
            filtered = filtered.filter((item) => {
              const itemTime = parseDateTime(item.startDate, 0, 0);
              return itemTime >= startTime && itemTime <= endTime;
            });
          }
        }

        const total = filtered.length;

        // Dynamic summary calculation by summing all filtered mock records
        const parseNumber = (val: string | number | undefined): number => {
          if (val === undefined || val === null || val === '') return 0;
          if (typeof val === 'number') return val;
          const clean = val.replace(/\./g, '').replace(/,/g, '.');
          const num = parseFloat(clean);
          return isNaN(num) ? 0 : num;
        };

        const formatNumber = (num: number): string => {
          return Math.round(num).toLocaleString('vi-VN');
        };

        let sumA95Vol = 0;
        let sumA95Amount = 0;
        let sumDOVol = 0;
        let sumDOAmount = 0;
        let sumRevenue = 0;
        let sumDebt = 0;

        for (const item of filtered) {
          sumA95Vol += parseNumber(item.fuelA95.volume);
          sumA95Amount += parseNumber(item.fuelA95.amount);
          sumDOVol += parseNumber(item.fuelDO.volume);
          sumDOAmount += parseNumber(item.fuelDO.amount);
          sumRevenue += parseNumber(item.revenue);
          sumDebt += parseNumber(item.debt);
        }

        const summary: ShiftRevenueSummary = {
          fuelA95Volume: formatNumber(sumA95Vol),
          fuelA95Amount: formatNumber(sumA95Amount),
          fuelDOVolume: formatNumber(sumDOVol),
          fuelDOAmount: formatNumber(sumDOAmount),
          revenue: formatNumber(sumRevenue),
          debt: formatNumber(sumDebt),
        };

        // Apply Pagination slice
        if (params?.first !== undefined && params?.rows !== undefined) {
          filtered = filtered.slice(params.first, params.first + params.rows);
        }

        resolve({
          data: filtered,
          summary,
          total,
        });
      }, 200);
    });
  },

  exportXlsx: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `Bao_cao_doanh_thu_theo_ca_${new Date().toISOString().slice(0, 10)}.xlsx`,
        });
      }, 400);
    });
  },

  exportPdf: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `Bao_cao_doanh_thu_theo_ca_${new Date().toISOString().slice(0, 10)}.pdf`,
        });
      }, 400);
    });
  },
};
