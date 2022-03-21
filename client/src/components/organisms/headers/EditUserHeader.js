import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Back} from "../../../images/icons/back.svg";
import {ReactComponent as Save} from "../../../images/icons/save.svg";
import Button from '../../atoms/button/Button';
import { useNavigate } from 'react-router-dom';


const EditUserHeader = ({clickSave, navigateTo}) => {
  const navigate = useNavigate();

  const handleSave = async () => {
    await clickSave();
    navigate(navigateTo);
  }

  return (
    <header className='edit-header'>
      <Button onClick={() => navigate(navigateTo)} className='button button--icon' >
        <Back className='edit-header__left-icon' />
        Back
      </Button>
      <Button onClick={handleSave} className='button button--icon' >
        <Save className='edit-header__right-icon' />
        Save
      </Button>
    </header>
  );
}

EditUserHeader.propTypes = {
  clickSave: PropTypes.func,
  navigateTo: PropTypes.string,
}

export default EditUserHeader;