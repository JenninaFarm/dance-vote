import React, { useState } from 'react';
import { restApi } from '../../../restApi';
import Button from '../../atoms/button/Button';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';
import Form from '../../atoms/form/Form';
import Input from '../../atoms/input/Input';
import Modal from '../../molecules/modal/Modal';

const Login = ({handleLogin, handleClose, openRegisteration}) => {
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
      const user = {username: res.username, id: res.user_id}
      handleLogin( user );
    } else {
      setError(res.error);
    }
  }
  return (
    <Modal>
      <div className='login'>
        <Button className='button button--icon login__close' onClick={handleClose}> X </Button>
        <h5 className='login__title'>Please log in</h5>
        <Form className='login__form' submit={handleSubmit}>
          <Input
            className='login__input'
            id='email'
            type='email'
            placeholder='email'
            handleValueChange={event => setEmail(event.target.value)}
            errorMessage='Please give a valid email'
            required
          />
          <Input
            className='login__input'
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
        <h4>or</h4>
        <Button
          onClick={openRegisteration}
          className='button button--secondary login__signup'
        >
          Sign up
        </Button>
      </div>
    </Modal>
  );
}

export default Login;