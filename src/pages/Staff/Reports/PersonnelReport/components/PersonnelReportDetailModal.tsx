import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Envelope, Buildings, ShieldCheck, CalendarBlank, MapPin } from '@phosphor-icons/react';
import { Modal } from '../../../../../components/ui/Modal';
import { Button } from '../../../../../components/ui/Button';
import type { PersonnelReportItem } from '../../../../../types/personnelReport';

interface PersonnelReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  personnel: PersonnelReportItem | null;
}

export const PersonnelReportDetailModal: FC<PersonnelReportDetailModalProps> = ({
  isOpen,
  onClose,
  personnel,
}) => {
  const { t } = useTranslation('common');

  if (!personnel) return null;

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('personnelReport.detailModal.title', 'Chi tiết nhân sự')}
      className="w-full max-w-[540px] rounded-xl"
      footer={
        <div className="flex justify-end p-4 border-t border-divide">
          <Button variant="outline" size="sm" onClick={onClose} className="px-5">
            {t('personnelReport.detailModal.close', 'Đóng')}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 p-6">
        {/* Top Profile Summary Card */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border/60">
          <div className="size-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl uppercase shrink-0">
            {personnel.fullName.slice(0, 2)}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-bold text-content-main m-0 truncate">
              {personnel.fullName}
            </h3>
            <p className="text-xs text-content-sub m-0 mt-0.5">
              @{personnel.username}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F8F0] text-[#12B76A] border border-[#A6F4C5]/60">
                <span className="size-1.5 rounded-full bg-[#12B76A]" />
                {personnel.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
              </span>
              <span className="text-xs text-content-hint">•</span>
              <span className="text-xs font-semibold text-content-main">
                {personnel.role}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-divide/80">
            <Phone size={18} className="text-content-sub shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-content-hint">Số điện thoại</span>
              <span className="font-medium text-content-main truncate">{personnel.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-divide/80">
            <Envelope size={18} className="text-content-sub shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-content-hint">Email</span>
              <span className="font-medium text-content-main truncate">
                {personnel.email || 'Chưa cập nhật'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-divide/80">
            <Buildings size={18} className="text-content-sub shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-content-hint">Trạm trực thuộc</span>
              <span className="font-medium text-content-main truncate">{personnel.stationName}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-divide/80">
            <ShieldCheck size={18} className="text-content-sub shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-content-hint">Phân quyền</span>
              <span className="font-medium text-content-main truncate">{personnel.role}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-divide/80 sm:col-span-2">
            <CalendarBlank size={18} className="text-content-sub shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-content-hint">Ngày bắt đầu làm việc</span>
              <span className="font-medium text-content-main">{personnel.joinDate || '12/03/2020'}</span>
            </div>
          </div>

          {personnel.address && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-divide/80 sm:col-span-2">
              <MapPin size={18} className="text-content-sub shrink-0 mt-0.5" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-content-hint">Địa chỉ</span>
                <span className="font-medium text-content-main">{personnel.address}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
