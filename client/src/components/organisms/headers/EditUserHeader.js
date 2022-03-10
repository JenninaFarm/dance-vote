import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import Button from '../../atoms/button/Button';


const EditPollHeader = () => {
  return (
    <header className='edit-header'>
      <Button className='button button--icon' >
        <Delete className='edit-header__left-icon' />
        Back
      </Button>
      <Button className='button button--icon' >
        <Delete className='edit-header__right-icon' />
        Save
      </Button>
    </header>
  );
}

EditPollHeader.propTypes = {

}

export default EditPollHeader;