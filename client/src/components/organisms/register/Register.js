import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../molecules/modal/Modal';
import Button from '../../atoms/button/Button';
import ErrorMessage from '../../atoms/error-message/ErrorMessage';
import Input from '../../atoms/input/Input';
import Form from '../../atoms/form/Form';
import { restApi } from '../../../restApi';
import {ReactComponent as Close} from "../../../images/icons/phone.svg";


const Register = ({handleClose}) => {
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
            handleValueChange={event => setUserName(event.target.value)}
            errorMessage='Please give a username'
            required
          />
          <Input
            className='register__input'
            id='email'
            type='email'
            placeholder='Email'
            handleValueChange={event => setEmail(event.target.value)}
            errorMessage='Please give a valid email'
            required
          />
          <Input
            className='register__input'
            id='password'
            type='password'
            placeholder='Password'
            handleValueChange={event => setPassword(event.target.value)}
            errorMessage='Please give a password with atleast 8 characters'
            minLength='8'
            required
          />
          <Input
            className='register__input'
            id='password'
            type='password'
            placeholder='Confirm password'
            handleValueChange={event => setPassword(event.target.value)}
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
      </div>
    </Modal>
  );
}

Register.propTypes = {
  handleClose: PropTypes.func,
}

export default Register;
