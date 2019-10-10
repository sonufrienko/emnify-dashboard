import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const filterFields = [
  'status',
  'service_profile',
  'tariff_profile',
  'last_updated',
  'created',
  'name',
  'tags',
  'ip_address',
  'imei',
]

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  }
}));

export const Container = styled.div`
    width: 1440px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex-direction: row;
    padding-left: 128px;
    padding-right: 128px;
    background-color: transparent;
    @media(max-width: 1360px) {
        padding-left: 100px;
        padding-right: 100px;
    }    
    @media(max-width: 1300px) {
        padding-left: 80px;
        padding-right: 80px;
    }    
    @media(max-width: 1250px) {
        padding-left: 40px;
        padding-right: 40px;
    }
    @media(max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
    }      
`;

const Filter = ({ handleChangeFilter, handleCancel, filters }) => {
  const classes = useStyles();
  const [values, setValues] = useState(filters);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSearch = () => {
    handleChangeFilter(values);
  }

  return (
    <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          {
            filterFields.map((field) => (
              <Grid item xs={6} key={field}>
                <TextField
                  id={field}
                  label={field}
                  // className={classes.textField}
                  value={values[field]}
                  onChange={handleChange(field)}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))
          }
        </Grid>

        <Button variant="contained" className={classes.button} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSearch}>
          Search
        </Button>
    </div>
  )
}

export default Filter;