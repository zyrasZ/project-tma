import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/ui/Input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useDebounce } from '../../../../hooks/ui/useDebounce';

interface CompanySearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const CompanySearch = ({ search, setSearch }: CompanySearchProps) => {
  const { t } = useTranslation('common');
  
  // State cục bộ để hiển thị ngay lập tức khi user gõ
  const [localSearch, setLocalSearch] = useState<string>(search);

  // Tái sử dụng hook useDebounce chuẩn UX 350ms cho text search
  const debouncedSearch = useDebounce<string>(localSearch, 350);

  // Cập nhật lại localSearch nếu props 'search' bị thay đổi từ bên ngoài (ví dụ: bấm nút Reset)
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Chỉ gọi setSearch lên component cha khi giá trị debounced thay đổi
  useEffect(() => {
    if (search !== debouncedSearch) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, search, setSearch]);

  return (
    <div className="w-full md:w-[320px]">
      <Input 
        label={t('companyManagement.search')}
        placeholder={t('companyManagement.searchPlaceholder')}
        iconLeft={<MagnifyingGlass size={20} />}
        value={localSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};
