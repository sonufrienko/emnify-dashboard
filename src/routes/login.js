import React, { useState } from 'react';
import Login from '../components/Login';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LoginWrapper, LoginBox, Title} from '../components/style';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()) {
      
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
