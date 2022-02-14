import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

const RegisterForm = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = (event) => {
    if ( !userName || !password || !email ) {
      
    }
    console.log('submit registration');
  }

  return (
    <form>
      <Label inputId='user-name' content='User name' />
      <Input 
        id='user-name'
        placeholder='User name'
        handleValueChange={event => setUserName(event.target.value)}
        errorMessage='Please give a username'
        required
      />
      <Label inputId='email' content='email' />
      <Input
        id='email'
        type='email'
        placeholder='example@example.com'
        handleValueChange={event => setEmail(event.target.value)}
        errorMessage='Please give a valid email'
        required  
      />
      <Label inputId='password' content='password' />
      <Input
        id='password'
        type='password'
        placeholder='password'
        handleValueChange={event => setPassword(event.target.value)}
        errorMessage='Please give a password with atleast 8 characters'
        minlength='8'
        required
      />
      <Button type='submit' onClick={handleSubmit} > Create account </Button>
    </form>
  );
}

export default RegisterForm;