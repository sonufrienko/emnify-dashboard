import React, { useState, useEffect } from 'react';
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
import TableHeader from './TableHeader';
import Collapse from "@material-ui/core/Collapse";
import DataStructure from './dataStructure';
import { SubFieldItem,  FieldLabel, TableCellStyles } from './styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  tableWrapper: {
    overflow: 'hidden'
  }
}));

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
export default function EndpointsList ({ endpoints, totalCount, page, perPage, filters, handleChangePage, handleChangeRowsPerPage, handleChangeFilter }) {
        const classes = useStyles();
        const [collapsedRow, setCollapsedRow] = useState(-1);
        const size = useWindowSize();

        return (
          <Paper className={classes.root}>
          <TableHeader title="Devices" handleChangeFilter={handleChangeFilter} filters={filters} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
            {
              (size.width >= 700) && 
                <TableHead >
                  <TableRow> { DataStructure.main.map(item => <TableCell>{ item.title }</TableCell>) }
                  </TableRow>
                </TableHead>
            }
                <TableBody>
                {endpoints.map((endpoint, index) => [
                    <TableRow 
                      key={endpoint.id} 
                      onClick={() => {
                        if (index === collapsedRow) setCollapsedRow(-1);
                        else setCollapsedRow(index);
                      }}
                      style={{ cursor: 'pointer' }}
                      >
                      { DataStructure.main.map(item => {
                        if (!item.custom) return <TableCell  align="left">{get(endpoint, item.pattern, "")}</TableCell>
                        else return <TableCell  align="left"> {item.custom(get(endpoint, item.pattern), size)} </TableCell>
                      }) }
                    </TableRow>,
                    <TableRow  key={`${endpoint.id}_subfield`}>
                    <TableCell style={TableCellStyles} colSpan={6}>
                      <Collapse
                        in={collapsedRow === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        { DataStructure.subfields.map(item => (
                          <SubFieldItem>
                            <FieldLabel> {item.title} </FieldLabel>
                            <span> {get(endpoint, item.pattern, "")} </span>
                          </SubFieldItem>
                        )) }
                        
                      </Collapse>
                    </TableCell>
                  </TableRow>
                ])}
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