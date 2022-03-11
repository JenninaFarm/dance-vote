import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from '../button/Button';
import Label from '../label/Label';

const InputWithButton = ({children, clickIcon, inputId, labelContent, disabled, ...rest}) => {
  return (
    <div>
      {labelContent && <Label inputId={inputId} content={labelContent} />}
      <Input className='input-with-button__input' {...rest} >
        <Button
          className='button button--icon input-with-button__button'
          onClick={clickIcon}
          disabled={disabled}
        >
          {children}
        </Button>
      </Input>
    </div>
    
  );
}

InputWithButton.defaultProps = {
  disabled: false,
}

InputWithButton.propTypes = {
  children: PropTypes.node,
  clickIcon: PropTypes.func,
  rest: PropTypes.any,
  inputId: PropTypes.string,
  labelContent: PropTypes.string,
  disabled: PropTypes.bool,
}

export default InputWithButton;