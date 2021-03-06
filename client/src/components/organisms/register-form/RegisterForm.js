import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import Form from '../../atoms/form/Form';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import { restApi } from '../../../restApi';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';

const RegisterForm = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const validate = (form) => {
    if(form.checkValidity()) {
      return true;
    }
    return false;
  }

  const showErrorMessagesIfNeeded = (form) => {
    for(let i=0; i<form.length; i++) {
      if(!form[i].checkValidity()) {
        form[i].classList.add('invalid-input');
      } else {
        if(form[i].classList.contains('invalid-input')) {
          form[i].classList.remove('invalid-input');
        }
      }
    }
  }

  const submitRegistration = async () => {
    const newUser = {
      username: userName,
      password: password,
      email: email, 
    }

    const res = await restApi.createUser(newUser);
    if(res.error) {
      setError(res.error);
    } else {
      setError(undefined);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    showErrorMessagesIfNeeded(event.target);

    if(validate(event.target)) {
      submitRegistration();
    } 
  }

  return (
    <Form submit={handleSubmit} >
      <Label inputId='user-name' content='User name' />
      <Input 
        id='user-name'
        placeholder='User name'
        handleValueChange={value => setUserName(value)}
        errorMessage='Please give a username'
        required
      />
      <Label inputId='email' content='email' />
      <Input
        id='email'
        type='email'
        placeholder='example@example.com'
        handleValueChange={value => setEmail(value)}
        errorMessage='Please give a valid email'
        required
      />
      <Label inputId='password' content='password' />
      <Input
        id='password'
        type='password'
        placeholder='password'
        handleValueChange={value => setPassword(value)}
        errorMessage='Please give a password with atleast 8 characters'
        minLength='8'
        required
      />
      {error && 
        <ErrorMessage>
          {error}
        </ErrorMessage>
      }
      <Button type='submit'> Create account </Button>
    </Form>
  );
}

export default RegisterForm;