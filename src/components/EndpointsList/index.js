import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

export default function EndpointsList ({ endpoints, totalCount, page, perPage, handleChangePage, handleChangeRowsPerPage }) {
        const classes = useStyles();
        return (
          <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left"> MSISDN </TableCell>
                    <TableCell align="left">IP</TableCell>
                    <TableCell align="left">IMEI</TableCell>
                    <TableCell align="left">Service Profile</TableCell>
                    <TableCell align="left">Tariff Profile</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {endpoints.map(endpoint => (
                    <TableRow key={endpoint.id}>
                        <TableCell component="th" scope="row">{endpoint.id}</TableCell>
                        <TableCell align="left">{get(endpoint, "sim.msisdn", "")}</TableCell>
                        <TableCell align="left">{endpoint.ip_address}</TableCell>
                        <TableCell align="left">{endpoint.imei}</TableCell>
                        <TableCell align="left">{endpoint.service_profile.name}</TableCell>
                        <TableCell align="left">{endpoint.tariff_profile.name}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={totalCount}
                      rowsPerPage={perPage}
                      page={page -1}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableRow>
              </TableFooter>
            </Table>
            </div>
            </Paper>
        )
}