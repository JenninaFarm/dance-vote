import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';
import Form from '../../atoms/form/Form';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const handleSubmit = () => {
    console.log('submit login');
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
          id='email'
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
        <Button type='submit'> Create account </Button>
      </Form>
    </div>
  );
}

export default Login;