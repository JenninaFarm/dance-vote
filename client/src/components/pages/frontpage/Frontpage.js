import React from 'react';
import ButtonWithNav from '../../atoms/button/ButtonWithNav';
// import PropTypes from 'prop-types';

import InputWithNavigation from '../../molecules/fieldsets/InputWithNavigation';

const Frontpage = () => {

  const createNewPoll = () => {
    console.log('click');
  }

  return (
    <div>
      <h1>Frontpage</h1>
      <InputWithNavigation
        buttonText='Join voting room'
        onClick={createNewPoll}
        placeholder='Enter access code to vote'
        inputId='participate'
        navBase='vote?poll_id='
      />
      
      <ButtonWithNav modifier='secondary' to='/register'> Sign up </ButtonWithNav>
      <ButtonWithNav to='/login'> Log in </ButtonWithNav>
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