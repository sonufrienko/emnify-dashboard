import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {localStore} from '../utils/store';
import {getAuth} from '../utils/api';
import { LoginWrapper, LoginBox, Title} from '../components/style';
import { async } from 'q';
const sha1 = require('sha1');

const initialUser = {
  email: '',
  password: '',
}
const initialErrors = {
  email: '',
  password: '',
}

const LoginRoute = () => {

  const [user, updateUser] = useState(initialUser);
  const [errors, updateErrors] = useState(initialErrors);
  const history = useHistory();


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(validate()) {
      const params = {
          username: user.email,
          password: sha1(user.password)
      }
      let res = await getAuth(params);
      if(res && res.auth_token) {
        localStore.set('jwt', res.auth_token);
        history.push('/endpoints');
      }
    }
    return false;
  }

  const handleChange = (key, value) => {
    let obj = {};
    value = value.replace(/ +/g, "");
    obj[key] = value;
    let newUser = Object.assign({},user, obj);    
    updateUser(newUser);
  }

  const validate = () => {
    let err = {
      email: '',
      password: '',
    };
    
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(
        !user.email || user.email === "" ||
        reg.test(user.email) === false
    ) 
    {
        err.email = 'Enter valid email';
    }

    if(user.password.length < 2) {
      err.password = 'Password is required';
    }

    updateErrors(Object.assign({}, errors, err));
    
    if(err.email !== "" || err.password !== "") {
      return false;
    }    
    return true;
  }

  return (
    <LoginWrapper>
      <div>
        <Title>Sing in</Title>
        <LoginBox>
        <form onSubmit={e => handleSubmit(e)}>
          <TextField
            error={errors.email === '' ? false : true}
            id="outlined-error"
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            name="EmailInput" 
            value={user.email}
            helperText={errors.email !== '' ? errors.email : ''}
            onChange={e => handleChange('email', e.target.value)}
          />
          
          <br />
          <TextField
            error={errors.password === '' ? false : true}
            type="password"
            id="outlined-error"
            label="Password"
            margin="normal"
            variant="outlined"
            name="PaswordInput" 
            value={user.password}
            helperText={errors.password !== '' ? errors.password : ''}
            onChange={e => handleChange('password', e.target.value)}
          />
          <br />
          <br />
          <br />

          <Button variant="contained" type="submit" color="primary">Sign in</Button>
        </form>          
        </LoginBox>
      </div>      
    </LoginWrapper>
  );
};

export default LoginRoute;
