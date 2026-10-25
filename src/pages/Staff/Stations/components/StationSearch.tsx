import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/ui/Input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useDebounce } from '../../../../hooks/ui/useDebounce';

interface StationSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const StationSearch = ({ search, setSearch }: StationSearchProps) => {
  const { t } = useTranslation('common');
  const [localSearch, setLocalSearch] = useState<string>(search);

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
    <div className="w-full md:w-[320px]">
      <Input 
        label={t('stationManagement.search')}
        placeholder={t('stationManagement.searchPlaceholder')}
        iconLeft={<MagnifyingGlass size={20} />}
        value={localSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};
