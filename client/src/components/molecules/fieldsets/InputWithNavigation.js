import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import ButtonWithNav from '../../atoms/button/ButtonWithNav';

const InputWithNavigation = ({buttonText, onClick, placeholder, inputId, labelContent, navBase, queryParam}) => {
  const [navTo, setNavTo] = useState('');

  return (
    <fieldset>
      <Label inputId={inputId} content={labelContent} />
      <Input id={inputId} placeholder={placeholder} handleValueChange={event => setNavTo(event.target.value)} />
      <ButtonWithNav to={`${navBase}?${queryParam}=${navTo}`}>
        {buttonText}
      </ButtonWithNav>
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