import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {localStore} from '../utils/store';
import {getAuth} from '../utils/api';
import { LoginWrapper, LoginBox, Title, ErrorText, FormInputBox, SubmitBox} from '../components/style';
import logoImage from '../images/logo.png';
import { async } from 'q';
const sha1 = require('sha1');

const initialUser = {
  email: '',
  password: '',
}
const initialErrors = {
  email: '',
  password: '',
  global: '',
}

const LoginRoute = () => {

  const [user, updateUser] = useState(initialUser);
  const [errors, updateErrors] = useState(initialErrors);
  const [errorGlobal, updateErrorGlobal] = useState("");
  const history = useHistory();


  const handleSubmit = async(e) => {
    e.preventDefault();
    updateErrorGlobal('');
    if(validate()) {
      const params = {
          username: user.email,
          password: sha1(user.password)
      }
      let res = await getAuth(params);
      if(res && res.auth_token) {
        localStore.set('jwt', res.auth_token);
        
        history.push('/endpoints');
      } else {
        updateErrorGlobal('Invalid email or password!');
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
        <LoginBox>
        <img src={logoImage} alt="logo emnify" />
        <Title>Sign in</Title>
        <form onSubmit={e => handleSubmit(e)}>
          <FormInputBox>
            <TextField
              error={errors.email === '' ? false : true}
              id="outlined-error"
              label="Email"
              type="text"
              margin="normal"
              variant="outlined"
              name="EmailInput" 
              value={user.email}
              style={{width: "100%"}}
              helperText={errors.email !== '' ? errors.email : ''}
              onChange={e => handleChange('email', e.target.value)}
            />          
          </FormInputBox>
          <FormInputBox>
            <TextField
              error={errors.password === '' ? false : true}
              type="password"
              id="outlined-error"
              label="Password"
              margin="normal"
              variant="outlined"
              name="PaswordInput" 
              value={user.password}
              style={{width: "100%"}}
              helperText={errors.password !== '' ? errors.password : ''}
              onChange={e => handleChange('password', e.target.value)}
            />
          </FormInputBox>
          
          
          {errorGlobal !=='' && (
            <ErrorText>
              {errorGlobal}
            </ErrorText>
          )}
          <SubmitBox>
            <Button variant="contained" type="submit" color="primary">Sign in</Button>
          </SubmitBox>
          
        </form>          
        </LoginBox>
      </div>      
    </LoginWrapper>
  );
};

export default LoginRoute;
