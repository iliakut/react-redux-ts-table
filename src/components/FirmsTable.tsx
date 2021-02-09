import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Firm, FirmKeys } from '../types/types';
import Modal from './Modal';

type FirmsTableProps = {
  headers: string[]
  rows: Firm[]
  rowsKeysToShow: FirmKeys[]
}

const FirmsTable: React.FC<FirmsTableProps> = ({ headers, rows, rowsKeysToShow }) => {

  const tableBody = () => (
    rows.map(row => (
      <TableRow key={row.name}>
        {
          rowsKeysToShow.map((key, index) => {
            if (key === 'name') {
              return<TableCell key={row.name + index}><Modal id={row.id}/></TableCell>;
            }
            return <TableCell key={row.name + index}>{row[key]}</TableCell>;
          })
        }
      </TableRow>
    ))
  )


  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {
              headers.map(tableHeader => <TableCell key={tableHeader}>{tableHeader}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FirmsTable;