import React, { useState } from 'react';
import { restApi } from '../../../restApi';
import Button from '../../atoms/button/Button';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';
import Form from '../../atoms/form/Form';
import Input from '../../atoms/input/Input';
import Modal from '../../molecules/modal/Modal';
import {ReactComponent as Close} from "../../../images/icons/close.svg";
import {ReactComponent as Eye} from "../../../images/icons/eye.svg";

const Login = ({handleLogin, handleClose, openRegisteration}) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [passwordInputType, setPasswordInputType] = useState('password');

  const handleSubmit = async (event) => {
    event.preventDefault();


    const login = {
      email: email,
      password: password,
    }
    const res = await restApi.login(login);
    if (!res.error) {
      const user = {username: res.username, id: res.user_id, email: res.email}
      handleLogin( user );
    } else {
      setError(res.error);
    }
  }

  const showPassword = () => {
    if(passwordInputType === 'password') {
      setPasswordInputType('type');
    } else {
      setPasswordInputType('password');
    }
  }

  return (
    <Modal>
      <div className='login'>
        <Button className='button button--icon login__close' onClick={handleClose} >
          <Close className='login__close-icon' />
        </Button>
        <h5 className='login__title'>Please log in</h5>
        <Form className='login__form' submit={handleSubmit}>
          <Input
            className='login__input'
            id='email'
            type='email'
            placeholder='email'
            handleValueChange={value => setEmail(value)}
            errorMessage='Please give a valid email'
            required
          />
          <Input
            className='login__input'
            id='password'
            type={passwordInputType}
            placeholder='email'
            handleValueChange={value => setPassword(value)}
            errorMessage='Please give a password'
            required
          >
            <Button
              type='button'
              className='button button--icon login__password-icon'
              onClick={showPassword}
            >
              <Eye />
            </Button>
          </Input>
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