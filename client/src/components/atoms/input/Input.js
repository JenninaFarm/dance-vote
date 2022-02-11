import React from 'react';
import PropTypes from 'prop-types';

const Input = ({type, placeholder, id, handleValueChange}) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      size={10} 
      id={id} 
      onChange={handleValueChange}
    />
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
}

export default Input;