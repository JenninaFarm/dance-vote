import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({children}) => {
  return (
    <p className='error-message' >
      {children}
    </p>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.string,
}

export default ErrorMessage;