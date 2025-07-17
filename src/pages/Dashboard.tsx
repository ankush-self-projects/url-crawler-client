import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Typography, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
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
  const { urls, loading, orderBy, order, handleSort, selected, handleSelect, handleSelectAll, handleBulkDelete, handleBulkCrawl, isCrawling, crawlSuccess, crawlError } = useUrls();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    // The fetchUrls call is now handled by useUrls
  }, [token]);

  if (loading) return <CircularProgress />;

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
        onBulkDelete={handleBulkDelete} // keep for direct call, but use onRequestDelete for button
        onRequestDelete={() => setConfirmOpen(true)}
        onBulkCrawl={handleBulkCrawl}
        isCrawling={isCrawling}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected URLs? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleBulkDelete();
              setConfirmOpen(false);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={crawlSuccess} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Crawl started successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!crawlError} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {crawlError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard; 