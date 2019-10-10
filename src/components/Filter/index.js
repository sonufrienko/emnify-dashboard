import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const filterFields = new Map([
  ['status', 'Status'],
  ['service_profile', 'Service Profile'],
  ['tariff_profile', 'Tariff Profile'],
  ['last_updated', 'Updated'],
  ['created', 'Created'],
  ['name', 'Name'],
  ['tags', 'Tags'],
  ['ip_address', 'IP'],
  ['imei', 'IMEI'],
]);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export const Container = styled.div`
  max-width: 620px;
  padding: 30px 20px 20px 20px;
  @media (max-width: 768px) {
    padding: 20px 20px 10px 20px;
  }
`;

export const ButtonsContainer = styled.div`
  text-align: right;
`;

const Filter = ({ handleChangeFilter, handleCancel, filters }) => {
  const classes = useStyles();
  const [values, setValues] = useState(filters);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSearch = () => {
    handleChangeFilter(values);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {[...filterFields.keys()].map(field => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              id={field}
              label={filterFields.get(field)}
              value={values[field]}
              onChange={handleChange(field)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
      
      <ButtonsContainer>
        <Button className={classes.button} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSearch}>
          Search
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Filter;
