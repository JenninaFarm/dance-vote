import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import PropTypes from 'prop-types';

import InputWithNavigation from '../../molecules/fieldsets/inputWithNavigation/InputWithNavigation';
import Login from '../../organisms/login/Login';
import Register from '../../organisms/register/Register';

const Frontpage = ({handleLogin}) => {
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
      <h2 className='frontpage__title'>Enter a room to vote or create your own votes by signing up!</h2>
      <InputWithNavigation
        buttonText='Join voting room'
        placeholder='Enter access code to vote'
        inputId='participate'
        navBase='vote?poll_id='
      />
      <h4>or</h4>
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
      <div className='frontpage__login'>
        <Button onClick={handleLoginOpen}>Log in</Button>
      </div>
      <Button modifier='secondary' onClick={handleOpenRegistration}>Sign up</Button>
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