import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Checkbox, Button, IconButton, Chip, Tooltip, TextField, TablePagination, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import { UrlInfo } from '../services/urlService';

const columns = [
  { id: 'ID', label: 'ID' },
  { id: 'URL', label: 'URL' },
  { id: 'HTMLVersion', label: 'Version' },
  { id: 'PageTitle', label: 'Title' },
  { id: 'Headings', label: 'Headings' },
  { id: 'HasLoginForm', label: 'Login ' },
  { id: 'Links', label: 'Links' },
  { id: 'Status', label: 'Status' }
] as const;

export type ColumnId = typeof columns[number]['id'];
type Order = 'asc' | 'desc';

interface UrlTableProps {
  urls: UrlInfo[];
  orderBy: ColumnId;
  order: Order;
  onSort: (column: ColumnId) => void;
  selected: number[];
  onSelect: (id: number) => void;
  onSelectAll: (checked: boolean, allIds: number[]) => void;
  onBulkDelete: () => void;
  onRequestDelete: () => void;
  onBulkCrawl: () => void;
  isCrawling: boolean;
  // Pagination and search
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UrlTable: FC<UrlTableProps> = ({ urls, orderBy, order, onSort, selected, onSelect, onSelectAll, onBulkDelete, onRequestDelete, onBulkCrawl, isCrawling, page, rowsPerPage, onPageChange, onRowsPerPageChange, search, onSearchChange }) => {
  // Filter urls by search
  const filteredUrls = search
    ? urls.filter(row => row.URL.toLowerCase().includes(search.toLowerCase()))
    : urls;
  // Paginate
  const paginatedUrls = filteredUrls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const allIds = paginatedUrls.map((row) => row.ID);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.includes(id));
  const sortableColumns: ColumnId[] = ['ID', 'URL', 'HTMLVersion', 'Status'];
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Search URL"
          value={search}
          onChange={onSearchChange}
          size="small"
          sx={{ width: 300 }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={selected.length === 0 || isCrawling}
            onClick={onBulkCrawl}
            sx={{ minWidth: 0, p: 1, mr: 1 }}
            aria-label="Crawl Selected"
          >
            <PlayArrowIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selected.length === 0}
            onClick={onRequestDelete}
            sx={{ minWidth: 0, p: 1 }}
            aria-label="Delete Selected"
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', height: 500, maxWidth: '100%', mx: 'auto', mb: 2, display: 'flex', flexDirection: 'column' }}>
        <TableContainer sx={{ maxHeight: 420, flex: 1, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={selected.length > 0 && !allSelected}
                    onChange={e => onSelectAll(e.target.checked, allIds)}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      transition: 'color 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                    sortDirection={orderBy === col.id ? order : false}
                  >
                    {sortableColumns.includes(col.id as ColumnId) ? (
                      <TableSortLabel
                        active={orderBy === col.id}
                        direction={orderBy === col.id ? order : 'asc'}
                        onClick={() => onSort(col.id as ColumnId)}
                      >
                        {col.label}
                      </TableSortLabel>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUrls.map((row) => (
                <TableRow key={row.ID} selected={selected.includes(row.ID)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(row.ID)}
                      onChange={() => onSelect(row.ID)}
                    />
                  </TableCell>
                  <TableCell>{row.ID}</TableCell>
                  <TableCell>{row.URL}</TableCell>
                  <TableCell>{row.HTMLVersion}</TableCell>
                  <TableCell>{row.PageTitle}</TableCell>
                  <TableCell>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tooltip title="H1" arrow>
                        <span>
                          <Chip
                            label={`<h1> ${parseInt((row.Headings.match(/H1: (\d+)/) || [])[1] || '0', 10)}`}
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ minWidth: 0, fontFamily: 'monospace', borderColor: 'error.main', mr: 1 }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="H2" arrow>
                        <span>
                          <Chip
                            label={`<h2> ${parseInt((row.Headings.match(/H2: (\d+)/) || [])[1] || '0', 10)}`}
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ minWidth: 0, fontFamily: 'monospace', borderColor: 'warning.main', mr: 1 }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="H3" arrow>
                        <span>
                          <Chip
                            label={`<h3> ${parseInt((row.Headings.match(/H3: (\d+)/) || [])[1] || '0', 10)}`}
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ minWidth: 0, fontFamily: 'monospace', borderColor: 'success.main' }}
                          />
                        </span>
                      </Tooltip>
                    </span>
                  </TableCell>
                  <TableCell>{row.HasLoginForm ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tooltip title="Internal" arrow>
                        <span>
                          <Chip
                            icon={<LinkIcon fontSize="small" />}
                            label={row.InternalLinks}
                            size="small"
                            color="primary"
                            sx={{ minWidth: 0 }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="External" arrow>
                        <span>
                          <Chip
                            icon={<OpenInNewIcon fontSize="small" />}
                            label={row.ExternalLinks}
                            size="small"
                            color="info"
                            sx={{ minWidth: 0 }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip title="Broken" arrow>
                        <span>
                          <Chip
                            icon={<BrokenImageIcon fontSize="small" />}
                            label={row.BrokenLinks}
                            size="small"
                            color="error"
                            sx={{ minWidth: 0 }}
                          />
                        </span>
                      </Tooltip>
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.Status}
                      color={
                        row.Status === 'done' ? 'success' :
                        row.Status === 'queued' ? 'warning' :
                        row.Status === 'error' ? 'error' :
                        'default'
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredUrls.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </>
  );
};

export default UrlTable; 