import { useEffect, useState, useCallback } from 'react';
import { fetchUrls, UrlInfo, deleteUrls } from '../services/urlService';

export type Order = 'asc' | 'desc';
export type ColumnId =
  | 'ID'
  | 'URL'
  | 'HTMLVersion'
  | 'PageTitle'
  | 'Headings'
  | 'InternalLinks'
  | 'ExternalLinks'
  | 'BrokenLinks'
  | 'HasLoginForm'
  | 'Status';

function sortRows<T>(rows: T[], orderBy: keyof T, order: Order): T[] {
  return [...rows].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue === bValue) return 0;
    if (order === 'asc') return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
  });
}

export function useUrls() {
  const [urls, setUrls] = useState<UrlInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<ColumnId>('ID');
  const [order, setOrder] = useState<Order>('asc');
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    fetchUrls()
      .then(setUrls)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = useCallback((column: ColumnId) => {
    if (orderBy === column) {
      setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(column);
      setOrder('asc');
    }
  }, [orderBy]);

  const handleSelect = useCallback((id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback((checked: boolean, allIds: number[]) => {
    setSelected(checked ? allIds : []);
  }, []);

  const handleBulkDelete = useCallback(async () => {
    await deleteUrls(selected);
    setUrls((prev) => prev.filter((url) => !selected.includes(url.ID)));
    setSelected([]);
  }, [selected]);

  const sortedRows = sortRows(urls, orderBy, order);

  return { urls: sortedRows, loading, orderBy, order, handleSort, selected, handleSelect, handleSelectAll, handleBulkDelete };
} 