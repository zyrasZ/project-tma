export type PersonnelStatus = 'active' | 'inactive' | 'locked';

export interface PersonnelReportItem {
  id: string;
  username: string;       // e.g. "duchai02"
  fullName: string;       // e.g. "Trần Đức Hải"
  phone: string;          // e.g. "0912345678"
  role: string;           // e.g. "Quản lý cửa hàng"
  stationId: string;      // e.g. "hung_duyet"
  stationName: string;    // e.g. "Trạm Hùng Duyệt"
  status: PersonnelStatus;// e.g. "active"
  email?: string;
  address?: string;
  joinDate?: string;
}

export interface GetPersonnelReportParams {
  stationId?: string;
  role?: string;
  status?: string;
  search?: string;
  first?: number;
  rows?: number;
}

export interface GetPersonnelReportResponse {
  data: PersonnelReportItem[];
  total: number;
}
