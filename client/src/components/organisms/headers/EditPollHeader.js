import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import Button from '../../atoms/button/Button';


const EditPollHeader = () => {
  return (
    <header className='edit-poll-header'>
      <Button className='button button--icon' >
        <Delete className='edit-poll-header__delete-icon' />
        Clear All
      </Button>
      <Button className='button button--icon' >
        <Delete className='edit-poll-header__save-icon' />
        Save Changes
      </Button>
    </header>
  );
}

EditPollHeader.propTypes = {

}

export default EditPollHeader;