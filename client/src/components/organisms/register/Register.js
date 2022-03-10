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


const Register = ({handleClose}) => {
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
          <Input
            className='register__input'
            id='password'
            type={passwordInputType}
            placeholder='Password'
            handleValueChange={value => setPassword(value)}
            errorMessage='Please give a password with atleast 8 characters'
            minLength='8'
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
          <Input
            className='register__input'
            id='confirm-password'
            type={passwordInputType}
            placeholder='Confirm password'
            handleValueChange={value => setPassword(value)}
            errorMessage='Please give a password with atleast 8 characters'
            minLength='8'
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
          <Button type='submit'> Create account </Button>
        </Form>
      </div>
    </Modal>
  );
}

Register.propTypes = {
  handleClose: PropTypes.func,
}

export default Register;
