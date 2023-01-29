import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { styled, withStyles } from '@mui/material/styles'

const columns = [
  { id: 'name', label: 'Ticker' },
  {
    id: 'price',
    label: 'price',
    align: 'start',
  },
  {
    id: '% change',
    label: '% Change',
    align: 'start',
  },
  {
    id: 'change',
    label: 'Price change',
    align: 'start',
  },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function PerformanceTableDisplay({ performance }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    performance && (
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {performance
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, key) => {
                  return (
                    <StyledTableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.ticker}
                    >
                      <StyledTableCell key={row.ticker} style={{ width: 300 }}>
                        <span class='flex flex-col gap-4'>
                          <span className='text-lightBlue font-bold'>
                            ${row?.ticker}
                          </span>{' '}
                          {row.companyName}
                        </span>
                      </StyledTableCell>

                      <StyledTableCell key={row.ticker}>
                        <span
                          className={
                            parseInt(row.price) > 0
                              ? 'bg-green p-2 rounded-md text-white'
                              : 'bg-red p-2 rounded-md text-white'
                          }
                        >
                          {' '}
                          ${row.price}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell key={row.ticker}>
                        {parseInt(row.changesPercentage)?.toFixed(2)}%
                      </StyledTableCell>
                      <StyledTableCell key={row.ticker}>
                        ${row.changes}
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 10, performance.length]}
          component='div'
          count={performance.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  )
}
