import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popover from '@material-ui/core/Popover';
import Filter from '../Filter';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
}));

const TableHeader = ({ title, handleChangeFilter, filters }) => {
  const classes = useToolbarStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = e => {
    setAnchorEl(null);
  };

  const onFilter = () => {
    setAnchorEl(null);
    handleChangeFilter();
  }

  const open = Boolean(anchorEl);

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={handleOpen}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Filter handleChangeFilter={onFilter} filters={filters} />
        </Popover>
      </div>
    </Toolbar>
  );
};

export default TableHeader;
