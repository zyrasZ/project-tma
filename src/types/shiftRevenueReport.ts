export interface ShiftRevenueFuelData {
  volume: string | number; // e.g. "1.100"
  amount: string | number; // e.g. "2.080.000"
}

export interface ShiftRevenueItem {
  id: string;              // e.g. "609364"
  startDate: string;       // e.g. "06/11/2020 16:48"
  endDate: string;         // e.g. "06/11/2020 16:48"
  stationId: string;       // e.g. "hung_duyet"
  stationName: string;     // e.g. "Trạm Hùng Duyệt"
  shiftName?: string;      // e.g. "Ca 1"
  staffName?: string;      // e.g. "Nguyễn Văn Linh"
  fuelA95: ShiftRevenueFuelData; // Xăng A95-II
  fuelDO: ShiftRevenueFuelData;  // Dầu DO
  revenue: string | number;      // Doanh thu (e.g. "31.000")
  debt: string | number;         // Ghi nợ (e.g. "115.600")
  createdAt?: string;
}

export interface ShiftRevenueSummary {
  fuelA95Volume: string | number; // e.g. "1.100"
  fuelA95Amount: string | number; // e.g. "2.080.000"
  fuelDOVolume: string | number;  // e.g. "1.100"
  fuelDOAmount: string | number;  // e.g. "2.080.000"
  revenue: string | number;       // e.g. "2.080.000"
  debt: string | number;          // e.g. "115.600"
}

export interface GetShiftRevenueReportParams {
  stationId?: string;
  shiftName?: string;
  displayParam?: string;
  displayParams?: string[];
  startDate?: string;
  dateRange?: string;
  search?: string;
  first?: number;
  rows?: number;
}

export interface GetShiftRevenueReportResponse {
  data: ShiftRevenueItem[];
  summary: ShiftRevenueSummary;
  total: number;
}
