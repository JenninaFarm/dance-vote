import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from '../button/Button';

const InputWithButton = ({children, clickIcon, ...rest}) => {
  return (
    <Input {...rest} >
      <Button onClick={clickIcon} >
        {children}
      </Button>
    </Input>
  );
}

InputWithButton.propTypes = {
  children: PropTypes.node,
  clickIcon: PropTypes.func,
  rest: PropTypes.any,
}

export default InputWithButton;