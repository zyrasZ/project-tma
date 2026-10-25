import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { InvoiceReportItem } from '../../../../../types/invoiceReport';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { ReportDataTable, type ReportColumnDef } from '../../../../../components/ui/DataTable';

interface InvoiceReportTableProps {
  reports: InvoiceReportItem[];
  isLoading?: boolean;
  onRowClick?: (report: InvoiceReportItem) => void;
}

export const InvoiceReportTable: FC<InvoiceReportTableProps> = ({
  reports,
  isLoading = false,
  onRowClick,
}) => {
  const { t } = useTranslation('common');

  const columns: ReportColumnDef<InvoiceReportItem>[] = useMemo(
    () => [
      { key: 'pumpCode', header: t('invoiceReport.table.pumpCode', 'Mã bơm'), minWidth: '130px', className: 'font-medium' },
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
        render: (item) => <InvoiceStatusBadge status={item.status} />,
      },
    ],
    [t]
  );

  return (
    <ReportDataTable
      data={reports}
      columns={columns}
      isLoading={isLoading}
      onRowClick={onRowClick}
      emptyMessage={t('invoiceReport.table.empty', 'Không có dữ liệu báo cáo hóa đơn')}
    />
  );
};
