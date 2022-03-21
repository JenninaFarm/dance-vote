import React from 'react';
// import PropTypes from 'prop-types';

import {ReactComponent as Back} from "../../../images/icons/back.svg";
import Button from '../../atoms/button/Button';


const EditPollHeader = () => {
  return (
    <header className='edit-header'>
      <Button className='button button--icon' >
        <Back className='edit-header__left-icon' />
        Back
      </Button>
    </header>
  );
}

EditPollHeader.propTypes = {

}

export default EditPollHeader;