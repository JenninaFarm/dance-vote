import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';

const InputWithButton = ({buttonText, onClick, placeholder, inputId, labelContent}) => {
  const [value, setValue] = useState('');

  const handleClick = () => {
    if(onClick) {
      onClick(value);
    }
  }

  return (
    <fieldset>
      <Label inputId={inputId} content={labelContent} />
      <Input id={inputId} placeholder={placeholder} handleValueChange={event => setValue(event.target.value)} />
      <Button onClick={handleClick} >
        {buttonText}
      </Button>
    </fieldset>
  );
}

InputWithButton.propTypes = {
  buttonText: PropTypes.string,
  inputId: PropTypes.string,
  onClick: PropTypes.func,
  labelContent: PropTypes.string,
  placeholder: PropTypes.string,
}

export default InputWithButton;