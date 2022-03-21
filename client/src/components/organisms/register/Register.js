import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../molecules/modal/Modal';
import Button from '../../atoms/button/Button';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';
import Input from '../../atoms/input/Input';
import Form from '../../atoms/form/Form';
import { restApi } from '../../../restApi';
import {ReactComponent as Close} from "../../../images/icons/close.svg";
import {ReactComponent as Eye} from "../../../images/icons/eye.svg";
import InputWithButton from '../../atoms/input/InputWithButton';


const Register = ({handleClose, openLogin}) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [passwordInputType, setPasswordInputType] = useState('password');

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

    console.log(newUser);
    const res = await restApi.createUser(newUser);
    console.log(res);
    if(res.error) {
      setError(res.error);
    } else {
      setError(undefined);
      openLogin();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    showErrorMessagesIfNeeded(event.target);

    if(validate(event.target)) {
      submitRegistration();
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
      <div className='register'>
        <Button className='button button--icon register__close' onClick={handleClose} >
          <Close className='register__close-icon' />
        </Button>
        <h5 className='register__title' >Please enter your information in
 order to create a new account</h5>
        <Form className='register__form' submit={handleSubmit} >
          <Input 
            className='register__input'
            id='user-name'
            placeholder='Username'
            handleValueChange={value => setUserName(value)}
            errorMessage='Please give a username'
            required
          />
          <Input
            className='register__input'
            id='email'
            type='email'
            placeholder='Email'
            handleValueChange={value => setEmail(value)}
            errorMessage='Please give a valid email'
            required
          />
          <InputWithButton
            id='password'
            clickIcon={showPassword}
            type={passwordInputType}
            placeholder='Password'
            handleValueChange={value => setPassword(value)}
            errorMessage='Please give a password'
            required
          >
            <Eye className='register__eye' />
          </InputWithButton>
          <InputWithButton
            id='confirm-password'
            clickIcon={showPassword}
            type={passwordInputType}
            placeholder='Confirm password'
            handleValueChange={value => setPassword(value)}
            errorMessage='Please give a password'
            required
          >
            <Eye className='register__eye' />
          </InputWithButton>
          {error && 
            <ErrorMessage>
              {error}
            </ErrorMessage>
          }
          <Button className='button register__button' type='submit'> Create account </Button>
          <Button
          onClick={openLogin}
            className='button button--link register__login'
          >
            Already have an account?
          </Button>
        </Form>
      </div>
    </Modal>
  );
}

Register.propTypes = {
  handleClose: PropTypes.func,
  openLogin: PropTypes.func,
}

export default Register;
