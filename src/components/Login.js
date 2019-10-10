import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Login = props => {
  const history = useHistory();

  function tryToLogin() {
    history.push('/endpoints');
  }

  return (
    <Button variant="contained" color="primary" onClick={tryToLogin}>
      Login
      
    </Button>
  );
};

export default Login;
