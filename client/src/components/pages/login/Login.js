import React, { useState } from 'react';
import { restApi } from '../../../restApi';
import Button from '../../atoms/button/Button';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';
import Form from '../../atoms/form/Form';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

const Login = ({handleLogin}) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();


    const login = {
      email: email,
      password: password,
    }
    const res = await restApi.login(login);
    if (!res.error) {
      handleLogin( res.username );
    } else {
      setError(res.error);
    }
  }

  return (
    <div>
      <h1> Login </h1>
      <Form submit={handleSubmit}>
        <Label inputId='email' content='email' />
        <Input 
          id='email'
          type='email'
          placeholder='email'
          handleValueChange={event => setEmail(event.target.value)}
          errorMessage='Please give a valid email'
          required
        />
        <Label inputId='password' content='password'/>
        <Input 
          id='password'
          type='password'
          placeholder='email'
          handleValueChange={event => setPassword(event.target.value)}
          errorMessage='Please give a password'
          required
        />
        {error && 
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        <Button type='submit'> Log in </Button>
      </Form>
    </div>
  );
}

export default Login;