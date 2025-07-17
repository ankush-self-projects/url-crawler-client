import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';
import { UrlInfo } from '../services/urlService';

const columns = [
  { id: 'ID', label: 'ID' },
  { id: 'URL', label: 'URL' },
  { id: 'HTMLVersion', label: 'HTML Version' },
  { id: 'PageTitle', label: 'Title' },
  { id: 'Headings', label: 'Headings' },
  { id: 'InternalLinks', label: 'Internal Links' },
  { id: 'ExternalLinks', label: 'External Links' },
  { id: 'BrokenLinks', label: 'Broken Links' },
  { id: 'HasLoginForm', label: 'Login ' },
  { id: 'Status', label: 'Status' }
] as const;

export type ColumnId = typeof columns[number]['id'];
type Order = 'asc' | 'desc';

interface UrlTableProps {
  urls: UrlInfo[];
  orderBy: ColumnId;
  order: Order;
  onSort: (column: ColumnId) => void;
}

const UrlTable: FC<UrlTableProps> = ({ urls, orderBy, order, onSort }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={col.id}
              sx={{ fontWeight: 'bold', backgroundColor: 'primary.main', color: 'primary.contrastText' }}
              sortDirection={orderBy === col.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === col.id}
                direction={orderBy === col.id ? order : 'asc'}
                onClick={() => onSort(col.id)}
              >
                {col.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {urls.map((row) => (
          <TableRow key={row.ID}>
            <TableCell>{row.ID}</TableCell>
            <TableCell>{row.URL}</TableCell>
            <TableCell>{row.HTMLVersion}</TableCell>
            <TableCell>{row.PageTitle}</TableCell>
            <TableCell>{row.Headings}</TableCell>
            <TableCell>{row.InternalLinks}</TableCell>
            <TableCell>{row.ExternalLinks}</TableCell>
            <TableCell>{row.BrokenLinks}</TableCell>
            <TableCell>{row.HasLoginForm ? 'Yes' : 'No'}</TableCell>
            <TableCell>{row.Status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UrlTable; 