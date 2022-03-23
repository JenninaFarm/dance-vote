import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import PropTypes from 'prop-types';

import InputWithNavigation from '../../molecules/fieldsets/inputWithNavigation/InputWithNavigation';
import Login from '../../organisms/login/Login';
import Register from '../../organisms/register/Register';
import { useNavigate } from 'react-router-dom';

const Frontpage = ({handleLogin}) => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => {
    setRegisterOpen(false);
    setLoginOpen(!loginOpen);
  }

  const handleOpenRegistration = () => {
    setLoginOpen(false);
    setRegisterOpen(!registerOpen);
  }

  return (
    <div className='frontpage'>
      <h1 className='frontpage__title'>DanceVote</h1>
      <Button
        className='button button--secondary frontpage__results'
        onClick={() => navigate('/results')}
      >
        View Results
      </Button>

      <h4 className='frontpage__divider'>or</h4>

      <InputWithNavigation
        buttonText='Join voting room'
        placeholder='Vote PIN'
        inputId='participate'
        navBase='vote?poll_id='
      />
      {loginOpen &&
        <Login
          handleClose={handleLoginOpen}
          handleLogin={handleLogin}
          openRegisteration={handleOpenRegistration}
        />
      }
      {registerOpen &&
        <Register
          handleClose={handleOpenRegistration}
          openLogin={handleLoginOpen}
        />
      }
      <div className='frontpage__footer'>
        <Button className='button button--secondary frontpage__register' onClick={handleOpenRegistration}>Sign up</Button>
        <Button className='button frontpage__login' onClick={handleLoginOpen}>Log in</Button>
      </div>
      
    </div>
  )
}

Frontpage.propTypes = {
  handleLogin: PropTypes.func,
  // optionalNumber: PropTypes.number,
  // optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  // requiredFunc: PropTypes.func.isRequired,
  // // An object taking on a particular shape
  // optionalObjectWithShape: PropTypes.shape({
  //   optionalProperty: PropTypes.string,
  //   requiredProperty: PropTypes.number.isRequired
  // }),

  // // An object with warnings on extra properties
  // optionalObjectWithStrictShape: PropTypes.exact({
  //   optionalProperty: PropTypes.string,
  //   requiredProperty: PropTypes.number.isRequired
  // }),
}

export default Frontpage;