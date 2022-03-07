import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import ButtonWithNav from '../../atoms/button/ButtonWithNav';

const InputWithNavigation = ({buttonText, placeholder, inputId, labelContent, navBase}) => {
  const [value, setValue] = useState('');

  return (
    <div>
      {labelContent && (
        <Label inputId={inputId} content={labelContent} />
      )}
      <Input 
        id={inputId}
        placeholder={placeholder}
        handleValueChange={event => setValue(event.target.value)}
      />
      <ButtonWithNav to={`${navBase}${value}`}>
        {buttonText}
      </ButtonWithNav>
    </div>
  );
}

InputWithNavigation.propTypes = {
  buttonText: PropTypes.string,
  inputId: PropTypes.string,
  onClick: PropTypes.func,
  labelContent: PropTypes.string,
  placeholder: PropTypes.string,
  navBase: PropTypes.string,
  navTo: PropTypes.string,
}

export default InputWithNavigation;