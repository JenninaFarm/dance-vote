import React from 'react';
import PropTypes from 'prop-types';

const EditPoll = ({children}) => {
  return (
    <div>
      <h2>Meine Box Privacy Policy</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      {children}
    </div>
  );
}

EditPoll.propTypes = {
  children: PropTypes.node,
}

export default EditPoll;