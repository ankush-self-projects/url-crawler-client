import { useEffect, useState, useCallback } from 'react';
import { fetchUrls, UrlInfo, deleteUrls, crawlUrls } from '../services/urlService';
import axios from 'axios';

export type Order = 'asc' | 'desc';
export type ColumnId =
  | 'ID'
  | 'URL'
  | 'HTMLVersion'
  | 'PageTitle'
  | 'Headings'
  | 'HasLoginForm'
  | 'Links'
  | 'Status';

function sortRows(rows: UrlInfo[], orderBy: ColumnId, order: Order): UrlInfo[] {
  return [...rows].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    if (orderBy === 'Links') {
      aValue = a.InternalLinks + a.ExternalLinks + a.BrokenLinks;
      bValue = b.InternalLinks + b.ExternalLinks + b.BrokenLinks;
    } else {
      aValue = a[orderBy as keyof UrlInfo];
      bValue = b[orderBy as keyof UrlInfo];
    }
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
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlSuccess, setCrawlSuccess] = useState(false);
  const [crawlError, setCrawlError] = useState('');

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

  const handleBulkCrawl = useCallback(async () => {
    setIsCrawling(true);
    setCrawlSuccess(false);
    setCrawlError('');
    try {
      await crawlUrls(selected);
      setCrawlSuccess(true);
      setTimeout(() => setCrawlSuccess(false), 2000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setCrawlError(err.response.data.message);
      } else {
        setCrawlError('Failed to run crawl.');
      }
      setTimeout(() => setCrawlError(''), 3000);
    } finally {
      setIsCrawling(false);
    }
  }, [selected]);

  const sortedRows = sortRows(urls, orderBy, order);

  return { urls: sortedRows, loading, orderBy, order, handleSort, selected, handleSelect, handleSelectAll, handleBulkDelete, handleBulkCrawl, isCrawling, crawlSuccess, crawlError };
} 