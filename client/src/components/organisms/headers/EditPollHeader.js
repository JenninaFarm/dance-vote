import React from 'react';
import { useNavigate } from 'react-router-dom';

import {ReactComponent as Back} from "../../../images/icons/back.svg";
import Button from '../../atoms/button/Button';

const EditPollHeader = () => {
  const navigate = useNavigate();

  return (
    <header className='edit-header'>
      <Button onClick={() => navigate('/profile')} className='button button--icon' >
        <Back className='edit-header__left-icon' />
        Back
      </Button>
    </header>
  );
}

export default EditPollHeader;