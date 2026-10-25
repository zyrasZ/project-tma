import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Input } from '../../../../components/ui/Input';
import { useDebounce } from '../../../../hooks/ui/useDebounce';

interface InvoiceConfigSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const InvoiceConfigSearch = ({ search, setSearch }: InvoiceConfigSearchProps) => {
  const { t } = useTranslation('common');
  const [localSearch, setLocalSearch] = useState<string>(search);

  // Tái sử dụng hook useDebounce chuẩn UX 350ms cho text search
  const debouncedSearch = useDebounce<string>(localSearch, 350);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    if (search !== debouncedSearch) {
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, search, setSearch]);

  return (
    <div className="w-full sm:w-[280px] md:w-[320px]">
      <Input
        label={t('invoiceConfig.search')}
        placeholder={t('invoiceConfig.searchPlaceholder')}
        iconLeft={<MagnifyingGlass size={18} className="text-gray-400" />}
        value={localSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
        clearable
        onClear={() => {
          setLocalSearch('');
          setSearch('');
        }}
      />
    </div>
  );
};
