import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/Modal';


const CreatePollMoldal = ({handleClose}) => {
  return (
    <Modal>
      <div>
      Create Poll

      </div>
    </Modal>
  );
}

CreatePollMoldal.propTypes = {
  handleClose: PropTypes.func,
}

export default CreatePollMoldal;