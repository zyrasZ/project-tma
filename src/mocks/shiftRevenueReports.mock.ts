import type { ShiftRevenueItem, ShiftRevenueSummary } from '../types/shiftRevenueReport';

const pad = (n: number) => n.toString().padStart(2, '0');

export const getRelativeDate = (daysAgo: number, timeStr = '06:00'): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${timeStr}`;
};

export const shiftOptionsMock = [
  { label: 'Tất cả các ca', value: 'all' },
  { label: 'Ca 1 (06:00 - 14:00)', value: 'shift_1' },
  { label: 'Ca 2 (14:00 - 22:00)', value: 'shift_2' },
  { label: 'Ca 3 (22:00 - 06:00)', value: 'shift_3' },
];

export const displayParamOptionsMock = [
  { label: 'Số lít (Sản lượng)', value: 'volume' },
  { label: 'Thành tiền', value: 'amount' },
  { label: 'Doanh thu', value: 'revenue' },
  { label: 'Ghi nợ (Công nợ)', value: 'debt' },
];

export const staticShiftSummaryMock: ShiftRevenueSummary = {
  fuelA95Volume: '1.100',
  fuelA95Amount: '2.080.000',
  fuelDOVolume: '1.100',
  fuelDOAmount: '2.080.000',
  revenue: '4.160.000',
  debt: '115.600',
};

// Helper generator to build realistic shifts with exact mathematical consistency
const buildStationShifts = (
  stationId: string,
  stationName: string,
  baseId: number,
  staffList: string[]
): ShiftRevenueItem[] => {
  const dates = [0, 1, 2, 3, 5, 7, 10, 15, 20, 35]; // 10 relative dates
  const shiftsDef = [
    { name: 'Ca 1', start: '06:00', end: '14:00', a95Vol: 1250, doVol: 980, debtRatio: 0.08 },
    { name: 'Ca 2', start: '14:00', end: '22:00', a95Vol: 1480, doVol: 1150, debtRatio: 0.09 },
    { name: 'Ca 3', start: '22:00', end: '06:00', a95Vol: 620, doVol: 740, debtRatio: 0.06 },
  ];

  const priceA95 = 25138;
  const priceDO = 19850;
  const items: ShiftRevenueItem[] = [];

  let idCounter = baseId;
  let staffIdx = 0;

  dates.forEach((daysAgo, dIdx) => {
    shiftsDef.forEach((shift, sIdx) => {
      // Add slight organic variations per day
      const dayVariation = (dIdx % 3 === 0 ? 1.02 : dIdx % 2 === 0 ? 0.98 : 1.0);
      const a95Vol = Math.round(shift.a95Vol * dayVariation);
      const doVol = Math.round(shift.doVol * dayVariation);

      const a95Amt = Math.round(a95Vol * priceA95);
      const doAmt = Math.round(doVol * priceDO);
      const revenue = a95Amt + doAmt;
      const debt = Math.round(revenue * shift.debtRatio);

      const staff = staffList[staffIdx % staffList.length];
      staffIdx++;

      items.push({
        id: String(idCounter++),
        startDate: getRelativeDate(daysAgo, shift.start),
        endDate: getRelativeDate(sIdx === 2 ? Math.max(0, daysAgo - 1) : daysAgo, shift.end),
        stationId,
        stationName,
        shiftName: shift.name,
        staffName: staff,
        fuelA95: {
          volume: a95Vol.toLocaleString('vi-VN'),
          amount: a95Amt.toLocaleString('vi-VN'),
        },
        fuelDO: {
          volume: doVol.toLocaleString('vi-VN'),
          amount: doAmt.toLocaleString('vi-VN'),
        },
        revenue: revenue.toLocaleString('vi-VN'),
        debt: debt.toLocaleString('vi-VN'),
      });
    });
  });

  return items;
};

// 1. Trạm Hùng Duyệt (hung_duyet) - 30 items
const hungDuyetItems = buildStationShifts(
  'hung_duyet',
  'Trạm Hùng Duyệt',
  609370,
  ['Nguyễn Văn Linh', 'Trần Văn Hoàng', 'Lê Thị Thu', 'Phạm Hồng Thái', 'Đặng Quốc Huy']
);

// 2. Trạm Quang Trung (000001) - 30 items
const quangTrungItems = buildStationShifts(
  '000001',
  'Trạm Quang Trung',
  609401,
  ['Trịnh Văn Nam', 'Phan Quốc Cường', 'Bùi Thị Lan', 'Võ Minh Trí', 'Đỗ Văn Đức']
);

// 3. Trạm Tô Ký (000002) - 30 items
const toKyItems = buildStationShifts(
  '000002',
  'Trạm Tô Ký',
  609420,
  ['Ngô Thanh Tùng', 'Đỗ Thị Mai', 'Hà Văn Bình', 'Phạm Thúy Nga', 'Lương Văn Toàn']
);

// 4. Trạm Nguyễn Ảnh Thủ (000003) - 30 items
const nguyenAnhThuItems = buildStationShifts(
  '000003',
  'Trạm Nguyễn Ảnh Thủ',
  609440,
  ['Dương Văn Tấn', 'Mai Thanh Hải', 'Nguyễn Thị Lệ', 'Vũ Hoàng Minh', 'Bùi Thanh Sơn']
);

// 5. Trạm Hoàng Hoa Thám (000004) - 30 items
const hoangHoaThamItems = buildStationShifts(
  '000004',
  'Trạm Hoàng Hoa Thám',
  609460,
  ['Lương Thế Hưng', 'Tô Vĩnh Phát', 'Lâm Thanh Phong', 'Nguyễn Đức Kiên', 'Hoàng Thị Oanh']
);

// Exact historical items from Figma design (06/11/2020)
const historicalItems: ShiftRevenueItem[] = [
  {
    id: '609364',
    startDate: '06/11/2020 16:48',
    endDate: '06/11/2020 16:48',
    stationId: 'hung_duyet',
    stationName: 'Trạm Hùng Duyệt',
    shiftName: 'Ca 1',
    staffName: 'Nguyễn Văn Linh',
    fuelA95: { volume: '1.100', amount: '2.080.000' },
    fuelDO: { volume: '1.100', amount: '2.080.000' },
    revenue: '4.160.000',
    debt: '115.600',
    createdAt: '2020-11-06 16:48',
  },
  {
    id: '609365',
    startDate: '06/11/2020 16:48',
    endDate: '06/11/2020 16:48',
    stationId: 'hung_duyet',
    stationName: 'Trạm Hùng Duyệt',
    shiftName: 'Ca 2',
    staffName: 'Trần Văn Hoàng',
    fuelA95: { volume: '1.100', amount: '2.080.000' },
    fuelDO: { volume: '1.100', amount: '2.080.000' },
    revenue: '4.160.000',
    debt: '115.600',
    createdAt: '2020-11-06 16:48',
  },
  {
    id: '609366',
    startDate: '06/11/2020 16:48',
    endDate: '06/11/2020 16:48',
    stationId: 'hung_duyet',
    stationName: 'Trạm Hùng Duyệt',
    shiftName: 'Ca 3',
    staffName: 'Lê Thị Thu',
    fuelA95: { volume: '1.100', amount: '2.080.000' },
    fuelDO: { volume: '1.100', amount: '2.080.000' },
    revenue: '4.160.000',
    debt: '115.600',
    createdAt: '2020-11-06 16:48',
  },
  {
    id: '609367',
    startDate: '06/11/2020 16:48',
    endDate: '06/11/2020 16:48',
    stationId: 'hung_duyet',
    stationName: 'Trạm Hùng Duyệt',
    shiftName: 'Ca 1',
    staffName: 'Phạm Hồng Thái',
    fuelA95: { volume: '1.100', amount: '2.080.000' },
    fuelDO: { volume: '1.100', amount: '2.080.000' },
    revenue: '4.160.000',
    debt: '115.600',
    createdAt: '2020-11-06 16:48',
  },
  {
    id: '609368',
    startDate: '06/11/2020 16:48',
    endDate: '06/11/2020 16:48',
    stationId: 'hung_duyet',
    stationName: 'Trạm Hùng Duyệt',
    shiftName: 'Ca 2',
    staffName: 'Đặng Quốc Huy',
    fuelA95: { volume: '1.100', amount: '2.080.000' },
    fuelDO: { volume: '1.100', amount: '2.080.000' },
    revenue: '4.160.000',
    debt: '115.600',
    createdAt: '2020-11-06 16:48',
  },
  {
    id: '609369',
    startDate: '06/11/2020 16:48',
    endDate: '06/11/2020 18:48',
    stationId: 'hung_duyet',
    stationName: 'Trạm Hùng Duyệt',
    shiftName: 'Ca 2',
    staffName: 'Nguyễn Văn Linh',
    fuelA95: { volume: '1.100', amount: '2.080.000' },
    fuelDO: { volume: '1.100', amount: '2.080.000' },
    revenue: '4.160.000',
    debt: '115.600',
    createdAt: '2020-11-06 16:48',
  },
];

export const shiftRevenueReportsMock: ShiftRevenueItem[] = [
  ...hungDuyetItems,
  ...quangTrungItems,
  ...toKyItems,
  ...nguyenAnhThuItems,
  ...hoangHoaThamItems,
  ...historicalItems,
];
