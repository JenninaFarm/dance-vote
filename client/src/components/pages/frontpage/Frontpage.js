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
        labelContent='Create new poll'
        buttonText='create'
        onClick={createNewPoll}
        placeholder='poll name'
        inputId='newPoll'
        navBase='new-poll'
        queryParam='poll'
      />
      <InputWithNavigation
        labelContent='Participate to a poll'
        buttonText='participate'
        onClick={createNewPoll}
        placeholder='poll id'
        inputId='participate'
        navBase='vote'
        queryParam='poll_id'
      />
      
      <ButtonWithNav to='/register'> Registration </ButtonWithNav>
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