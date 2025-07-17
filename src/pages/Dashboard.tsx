import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { fetchUrls, UrlInfo } from '../services/urlService';
import { useAuth } from '../contexts/AuthContext';
import UrlTable from '../components/UrlTable';
import type { ColumnId } from '../components/UrlTable';
import { useUrls } from '../hooks/useUrls';

type Order = 'asc' | 'desc';

function sortRows<T>(rows: T[], orderBy: keyof T, order: Order): T[] {
  return [...rows].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue === bValue) return 0;
    if (order === 'asc') return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
  });
}

const Dashboard: FC = () => {
  const { token } = useAuth();
  const { urls, loading, orderBy, order, handleSort, selected, handleSelect, handleSelectAll, handleBulkDelete } = useUrls();

  useEffect(() => {
    if (!token) return;
    // The fetchUrls call is now handled by useUrls
  }, [token]);

  if (loading) return <CircularProgress />;

  const sortedRows = sortRows(urls, orderBy, order);

  return (
    <>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <UrlTable
        urls={urls}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        selected={selected}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onBulkDelete={handleBulkDelete}
      />
    </>
  );
};

export default Dashboard; 