import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message/ErrorMessage';

const Input = ({type, placeholder, id, handleValueChange, errorMessage, ...rest}) => {
  
  return (
    <div className='input-container'>
      <input 
        type={type} 
        placeholder={placeholder} 
        size={10} 
        id={id} 
        onChange={handleValueChange}
        {...rest}
      />

      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>

    </div> 
  );
}

Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  handleValueChange: PropTypes.func,
  errorMessage: PropTypes.string,
}

export default Input;