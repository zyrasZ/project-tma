import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds (default: 350ms - UX standard for text search).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
