export type DebtType = 'debt' | 'payment'; // 'Ghi nợ' | 'Thanh toán'

export interface DebtReportItem {
  id: string;              // e.g. "20240328015310-000001-1-611" or "12345678"
  time: string;            // e.g. "24/01/2024 11:00"
  type: DebtType;          // 'debt' | 'payment'
  typeName: string;        // 'Ghi nợ' | 'Thanh toán'
  product?: string;        // e.g. "Xăng RON 95-III"
  unit?: string;           // e.g. "Lít"
  quantity?: string | number; // e.g. "1,379"
  unitPrice?: string | number;// e.g. "22.480"
  amount: string | number; // e.g. "-31.000" or "+31.000"
  buyerName?: string;      // e.g. "Nguyễn Trường An"
  phone?: string;          // e.g. "0912345678"
  email?: string;          // e.g. "annt@tma.com.vn"
  station?: string;        // e.g. "Trạm Hùng Duyệt"
  customerId?: string;     // e.g. "tma_petroleum"
  customerName?: string;   // e.g. "Công ty xăng dầu TMA"
}

export interface DebtReportSummary {
  debtInPeriod: string | number; // e.g. "-3.000.000đ"
  paidInPeriod: string | number; // e.g. "6.000.000đ"
}

export interface GetDebtReportParams {
  customerId?: string;
  displayParams?: string[];
  startDate?: string;
  endDate?: string;
  dateRange?: string;
  search?: string;
  first?: number;
  rows?: number;
}

export interface GetDebtReportResponse {
  data: DebtReportItem[];
  summary: DebtReportSummary;
  total: number;
}
