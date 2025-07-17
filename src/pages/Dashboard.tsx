import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { fetchUrls, UrlInfo } from '../services/urlService';
import { useAuth } from '../contexts/AuthContext';
import UrlTable from '../components/UrlTable';
import type { ColumnId } from '../components/UrlTable';

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
  const [urls, setUrls] = useState<UrlInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<ColumnId>('ID');
  const [order, setOrder] = useState<Order>('asc');

  useEffect(() => {
    if (!token) return;
    fetchUrls()
      .then(setUrls)
      .finally(() => setLoading(false));
  }, [token]);

  const handleSort = (column: ColumnId) => {
    if (orderBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrder('asc');
    }
  };

  if (loading) return <CircularProgress />;

  const sortedRows = sortRows(urls, orderBy, order);

  return (
    <>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <UrlTable urls={sortedRows} orderBy={orderBy} order={order} onSort={handleSort} />
    </>
  );
};

export default Dashboard; 