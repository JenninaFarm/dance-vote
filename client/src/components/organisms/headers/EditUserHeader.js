import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Back} from "../../../images/icons/trash-l.svg";
import {ReactComponent as Save} from "../../../images/icons/trash-l.svg";
import Button from '../../atoms/button/Button';
import { useNavigate } from 'react-router-dom';


const EditUserHeader = () => {
  const navigate = useNavigate();

  return (
    <header className='edit-header'>
      <Button onClick={() => navigate('../user')} className='button button--icon' >
        <Back className='edit-header__left-icon' />
        Back
      </Button>
      <Button className='button button--icon' >
        <Save className='edit-header__right-icon' />
        Save
      </Button>
    </header>
  );
}

EditUserHeader.propTypes = {

}

export default EditUserHeader;