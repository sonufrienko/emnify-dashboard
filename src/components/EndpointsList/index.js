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
import Collapse from "@material-ui/core/Collapse";
import styled from 'styled-components';
import { CloudDone, CloudOff, SimCard, MobileFriendly, ScreenLockPortrait } from '@material-ui/icons';


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

function useWindowSize() {
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
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}


const SubFieldItem = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`;

const FieldLabel = styled.span`
    font-weight: bold;
    width: 110px;
    text-align: right;
    margin-right: 15px;
    color: #4c4040;
`;

const DataStructure = {
  main: [
    {
      title: 'Status',
      pattern: 'status.id',
      custom: (status) => (status === 0) ? <CloudDone/> : <CloudOff />
    },
    {
      title: 'Name',
      pattern: 'name'
    },
    {
      title: 'ICCID',
      pattern: 'sim.iccid',
      custom: (value, size) => {
        if (size.width <= 700) {
          return (value) ? <SimCard/> : false;
        } else return value;
      } 
    },
    {
      title: 'IMEI',
      pattern: 'imei',
      custom: (value, size) => {
        if (size.width <= 700) {
          return (value) ? <MobileFriendly/> : false;
        } else return value;
      } 
    },
    {
      title: 'IMEI Lock',
      pattern: 'imei_lock',
      custom: (value) => (value) ? <ScreenLockPortrait/> : false
    }
  ],
  subfields: [
    {
      pattern: "id",
      title: "ID"
    },
    {
      pattern: "sim.msisdn",
      title: "MSISDN"
    },
    {
      pattern: "ip_address",
      title: "IP"
    },
    {
      pattern: "service_profile.name",
      title: "Service Profile"
    },
    {
      pattern: "tariff_profile.name",
      title: "Tariff Profile"
    }
  ]
}

export default function EndpointsList ({ endpoints, totalCount, page, perPage, handleChangePage, handleChangeRowsPerPage }) {
        const classes = useStyles();
        const [collapsedRow, setCollapsedRow] = useState(-1);
        const size = useWindowSize();

        return (
          <Paper className={classes.root}>
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
                    <TableCell style={{ padding: 0, paddingTop: 0, borderTop: 'none', background: 'rgba(128, 128, 128, 0.05)' }} colSpan={6}>
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