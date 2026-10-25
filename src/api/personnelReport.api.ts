import { personnelReportsMock } from '../mocks/personnelReports.mock';
import type {
  GetPersonnelReportParams,
  GetPersonnelReportResponse,
} from '../types/personnelReport';

export const personnelReportApi = {
  getPersonnelReports: async (
    params?: GetPersonnelReportParams
  ): Promise<GetPersonnelReportResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...personnelReportsMock];

        // 1. Filter by Station
        if (params?.stationId && params.stationId !== 'all') {
          filtered = filtered.filter((item) => item.stationId === params.stationId);
        }

        // 2. Filter by Role
        if (params?.role && params.role !== 'all') {
          filtered = filtered.filter((item) => item.role === params.role);
        }

        // 3. Filter by Status
        if (params?.status && params.status !== 'all') {
          filtered = filtered.filter((item) => item.status === params.status);
        }

        // 4. Filter by Search Query (username, fullName, phone)
        if (params?.search && params.search.trim() !== '') {
          const s = params.search.toLowerCase().trim();
          filtered = filtered.filter(
            (item) =>
              item.username.toLowerCase().includes(s) ||
              item.fullName.toLowerCase().includes(s) ||
              item.phone.includes(s)
          );
        }

        const total = filtered.length;

        // 5. Apply pagination slice
        if (params?.first !== undefined && params?.rows !== undefined) {
          filtered = filtered.slice(params.first, params.first + params.rows);
        }

        resolve({
          data: filtered,
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
          filename: `Bao_cao_nhan_su_${new Date().toISOString().slice(0, 10)}.xlsx`,
        });
      }, 400);
    });
  },

  exportPdf: async (): Promise<{ success: boolean; filename: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          filename: `Bao_cao_nhan_su_${new Date().toISOString().slice(0, 10)}.pdf`,
        });
      }, 400);
    });
  },
};
