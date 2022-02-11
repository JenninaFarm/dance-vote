import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';

const InputWithNavigation = ({buttonText, onClick, placeholder, inputId, labelContent, navBase, queryParam}) => {
  const [navTo, setNavTo] = useState('');

  return (
    <fieldset>
      <Label inputId={inputId} content={labelContent} />
      <Input id={inputId} placeholder={placeholder} handleValueChange={event => setNavTo(event.target.value)} />
      <NavLink to={`${navBase}?${queryParam}=${navTo}`}>
        <Button onClick={onClick}>
          {buttonText}
        </Button>
      </NavLink>
    </fieldset>
  );
}

InputWithNavigation.propTypes = {
  buttonText: PropTypes.string,
  inputId: PropTypes.string,
  onClick: PropTypes.func,
  labelContent: PropTypes.string,
  placeholder: PropTypes.string,
  navBase: PropTypes.string,
  queryParam: PropTypes.string,
}

export default InputWithNavigation;