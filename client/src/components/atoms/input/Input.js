import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message/ErrorMessage';
import { useWindowSize } from '../../../HelperFunctions';

const Input = ({children, valueSet, type, placeholder, id, handleValueChange, errorMessage, ...rest}) => {
  const [value, setValue] = useState(valueSet? valueSet : '');
  const [width, height] = useWindowSize();

  const handleChange = (e) => {
    setValue(e.target.value);
    handleValueChange(e.target.value);
  }

  useEffect(() => {
    console.log('height changed');
    if (id === document.activeElement.id) {
      console.log('active input');
      const center = height / 2;
      const top = document.getElementById(id).offsetTop;
      if (top > center) {
          console.log('here');
          window.scrollTo({
            top: top - center,
            left: 0,
            behavior: 'auto'
          });        
      }
    }
  }, [height, id] )

  useEffect(() => {
    if(valueSet) {
      setValue(valueSet);
    }
  }, [valueSet]);
  
  return (
    <div className='input-container'>
      <input 
        type={type} 
        placeholder={placeholder} 
        id={id} 
        value={value}
        onChange={handleChange}
        {...rest}
      />

      {children}
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
  children: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  handleValueChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export default Input;