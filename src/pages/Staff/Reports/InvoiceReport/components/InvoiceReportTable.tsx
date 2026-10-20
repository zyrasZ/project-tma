import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { InvoiceReportItem } from '../../../../../types/invoiceReport';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import {
  DataTable,
  DataTableTableContainer,
  DataTableTable,
  DataTableTHead,
  DataTableTHeadRow,
  DataTableTHeadCell,
  DataTableTBody,
  DataTableRow,
  DataTableCell,
  DataTableLoading,
} from '../../../../../components/ui/DataTable';

interface InvoiceReportTableProps {
  reports: InvoiceReportItem[];
  isLoading?: boolean;
  onRowClick?: (report: InvoiceReportItem) => void;
}

interface ColumnDef {
  key: string;
  header: string;
  minWidth: string;
  className?: string;
  defaultVal?: string;
  render?: (item: InvoiceReportItem) => React.ReactNode;
}

export const InvoiceReportTable: FC<InvoiceReportTableProps> = ({
  reports,
  isLoading = false,
  onRowClick,
}) => {
  const { t } = useTranslation('common');

  const columns: ColumnDef[] = useMemo(
    () => [
      { key: 'pumpCode', header: t('invoiceReport.table.pumpCode', 'Mã bơm'), minWidth: '130px', className: 'font-medium pl-6' },
      { key: 'customerCode', header: t('invoiceReport.table.customerCode', 'Mã khách hàng'), minWidth: '120px' },
      { key: 'exchangeRate', header: t('invoiceReport.table.exchangeRate', 'Tỷ giá'), minWidth: '70px', defaultVal: '1' },
      { key: 'currency', header: t('invoiceReport.table.currency', 'Đơn vị tiền tệ'), minWidth: '110px', defaultVal: 'VNĐ' },
      { key: 'buyerName', header: t('invoiceReport.table.buyerName', 'Tên người mua'), minWidth: '150px' },
      { key: 'customerName', header: t('invoiceReport.table.customerName', 'Tên khách hàng'), minWidth: '180px' },
      { key: 'taxCode', header: t('invoiceReport.table.taxCode', 'Mã số thuế'), minWidth: '120px' },
      { key: 'address', header: t('invoiceReport.table.address', 'Địa chỉ'), minWidth: '160px' },
      { key: 'email', header: t('invoiceReport.table.email', 'Email'), minWidth: '180px' },
      { key: 'fuelType', header: t('invoiceReport.table.fuelType', 'Nhiên liệu'), minWidth: '140px' },
      { key: 'unit', header: t('invoiceReport.table.unit', 'Đơn vị tính'), minWidth: '100px', defaultVal: 'Lít' },
      { key: 'quantity', header: t('invoiceReport.table.quantity', 'Số lượng'), minWidth: '100px', defaultVal: '8,11' },
      { key: 'unitPrice', header: t('invoiceReport.table.unitPrice', 'Đơn giá chưa thuế'), minWidth: '130px', defaultVal: '25.138' },
      { key: 'subtotal', header: t('invoiceReport.table.subtotal', 'Thành tiền'), minWidth: '120px', defaultVal: '110.505' },
      { key: 'taxRate', header: t('invoiceReport.table.taxRate', '% thuế GTGT'), minWidth: '110px', defaultVal: '10%' },
      { key: 'taxAmount', header: t('invoiceReport.table.taxAmount', 'Tiền thuế GTGT'), minWidth: '120px', defaultVal: '10.500' },
      { key: 'totalAmount', header: t('invoiceReport.table.totalAmount', 'Tổng tiền'), minWidth: '120px', defaultVal: '115.000' },
      { key: 'paymentMethod', header: t('invoiceReport.table.paymentMethod', 'Hình thức thanh toán'), minWidth: '150px', defaultVal: 'TM/CK' },
      { key: 'formNumber', header: t('invoiceReport.table.formNumber', 'Mẫu số'), minWidth: '80px', defaultVal: '1' },
      { key: 'symbol', header: t('invoiceReport.table.symbol', 'Ký hiệu'), minWidth: '100px', defaultVal: 'K24TYY' },
      { key: 'pumpDate', header: t('invoiceReport.table.pumpDate', 'Ngày bơm'), minWidth: '140px', defaultVal: '06/11/2023 16:48' },
      { key: 'createdDate', header: t('invoiceReport.table.createdDate', 'Ngày tạo'), minWidth: '140px', defaultVal: '06/11/2023 16:48' },
      {
        key: 'status',
        header: t('invoiceReport.table.status', 'Trạng thái'),
        minWidth: '120px',
        className: 'pr-6',
        render: (item) => <InvoiceStatusBadge status={item.status} />,
      },
    ],
    [t]
  );

  return (
    <DataTable className="w-full relative">
      {isLoading && <DataTableLoading />}
      <DataTableTableContainer className="overflow-x-auto">
        <DataTableTable className="w-full text-left border-collapse">
          <DataTableTHead>
            <DataTableTHeadRow className="bg-grey-primary-60 border-b border-divide text-[13px] text-content-main">
              {columns.map((col, index) => (
                <DataTableTHeadCell
                  key={col.key}
                  className={`py-3 px-4 font-semibold text-content-main whitespace-nowrap ${index === 0 ? 'pl-6' : ''} ${index === columns.length - 1 ? 'pr-6' : ''}`}
                  style={{ minWidth: col.minWidth }}
                >
                  {col.header}
                </DataTableTHeadCell>
              ))}
            </DataTableTHeadRow>
          </DataTableTHead>

          <DataTableTBody>
            {reports.length === 0 ? (
              <DataTableRow>
                <DataTableCell colSpan={columns.length} className="py-12 text-center text-content-sub text-sm">
                  {t('invoiceReport.table.empty', 'Không có dữ liệu báo cáo hóa đơn')}
                </DataTableCell>
              </DataTableRow>
            ) : (
              reports.map((item) => (
                <DataTableRow
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className="hover:bg-surface/60 transition-colors border-b border-divide text-[13px] cursor-pointer group"
                >
                  {columns.map((col) => {
                    const rawVal = (item as any)[col.key];
                    const displayVal = rawVal !== undefined && rawVal !== null && rawVal !== '' ? rawVal : col.defaultVal || '-';

                    return (
                      <DataTableCell
                        key={col.key}
                        className={`py-3.5 px-4 text-content-main whitespace-nowrap ${col.className || ''}`}
                      >
                        {col.render ? col.render(item) : displayVal}
                      </DataTableCell>
                    );
                  })}
                </DataTableRow>
              ))
            )}
          </DataTableTBody>
        </DataTableTable>
      </DataTableTableContainer>
    </DataTable>
  );
};
