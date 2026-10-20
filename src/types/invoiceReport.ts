export interface InvoiceReportItem {
  id: string;
  pumpCode: string;          // 1. Mã bơm (e.g. 240-1-753910)
  customerCode: string;      // 2. Mã khách hàng (e.g. KH001, KH002)
  exchangeRate: number;      // 3. Tỷ giá (e.g. 1)
  currency: string;          // 4. Đơn vị tiền tệ (e.g. VNĐ)
  buyerName: string;         // 5. Tên người mua (e.g. Nguyễn Văn Linh)
  customerName: string;      // 6. Tên khách hàng (e.g. Công ty xăng dầu TMA)
  taxCode: string;           // 7. Mã số thuế (e.g. 0301425912)
  address: string;           // 8. Địa chỉ (e.g. 100 Quang Trung)
  email: string;             // 9. Email (e.g. xangdau@tma.com.vn)
  fuelType: string;          // 10. Nhiên liệu (e.g. Xăng RON 95-III, Xăng A95, Xăng RON-95)
  unit?: string;              // 11. Đơn vị tính (e.g. Lít)
  quantity?: string | number; // 12. Số lượng (e.g. 8,11 / 7,561 / 2,129 / 1,01 / 3,279)
  unitPrice?: string | number;// 13. Đơn giá chưa thuế (e.g. 25.138)
  subtotal?: string | number; // 14. Thành tiền (e.g. 110.505)
  taxRate?: string;           // 15. % thuế GTGT (e.g. 10%)
  taxAmount?: string | number;// 16. Tiền thuế GTGT (e.g. 10.500)
  totalAmount?: string | number; // 17. Tổng tiền (e.g. 115.000)
  paymentMethod?: string;     // 18. Hình thức thanh toán (e.g. TM/CK)
  formNumber?: string;        // 19. Mẫu số (e.g. 1)
  symbol?: string;            // 20. Ký hiệu (e.g. K24TYY)
  pumpDate?: string;          // 21. Ngày bơm (e.g. 06/11/2023 16:48)
  createdDate?: string;       // 22. Ngày tạo (e.g. 06/11/2023 16:48)
  status: 'issued' | 'pending' | 'error' | 'flagged'; // 23. Trạng thái (issued: Đã xuất, pending: Chưa xuất)
  stationId?: string;        // ID trạm
  stationName?: string;      // Tên trạm
  createdAt?: string;
  amount?: number;
}

export interface InvoiceReportStats {
  issuedCount: number;       // Hóa đơn đã xuất (200)
  pendingCount: number;      // Hóa đơn chưa xuất (300)
  errorCount: number;        // Hóa đơn xuất lỗi (10)
  flaggedCount: number;      // Hóa đơn đánh dấu (20)
}

export interface GetInvoiceReportParams {
  stationId?: string;
  displayParam?: string;
  search?: string;
  fuelType?: string;
  status?: string;
  dateRange?: string;
  fromDate?: string;
  toDate?: string;
  first?: number;
  rows?: number;
}

export interface GetInvoiceReportResponse {
  data: InvoiceReportItem[];
  total: number;
  stats: InvoiceReportStats;
}
