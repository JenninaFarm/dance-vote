import React, { useState } from 'react';
import Button from '../../atoms/button/Button';
import ButtonWithNav from '../../atoms/button/ButtonWithNav';
// import PropTypes from 'prop-types';

import InputWithNavigation from '../../molecules/fieldsets/inputWithNavigation/InputWithNavigation';
import Login from '../../organisms/login/Login';

const Frontpage = ({handleLogin}) => {
  const [loginOpen, setLoginOpen] = useState(false);

  const createNewPoll = () => {
    console.log('click');
  }

  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  }

  return (
    <div className='frontpage'>
      <h2 className='frontpage__title'>Enter a room to vote or create your own votes by signing up!</h2>
      <InputWithNavigation
        buttonText='Join voting room'
        onClick={createNewPoll}
        placeholder='Enter access code to vote'
        inputId='participate'
        navBase='vote?poll_id='
      />
      <h4>or</h4>
      <Button onClick={handleLoginOpen}>Kirjaudu</Button>
      {loginOpen && <Login handleClose={handleLoginOpen} handleLogin={handleLogin} />}
      
      <div className='frontpage__login'>
        <ButtonWithNav to='/login'> Log in </ButtonWithNav>
      </div>
      <ButtonWithNav modifier='secondary' to='/register'> Sign up </ButtonWithNav>
    </div>
  )
}

Frontpage.propTypes = {
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