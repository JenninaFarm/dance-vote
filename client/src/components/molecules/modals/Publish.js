import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../atoms/button/Button';
import Modal from '../modal/Modal';

const Publish = ({handleClose, publish}) => {

  return (
    <Modal>
      <div className='publish'>
        <h2 className='publish__title'>Are you sure you want to publish the results?</h2>
        <p className='publish__summary'>Publishing will end the vote and the results are reveived by the voters.</p>
        <div className='publish__buttons'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={publish}>Publish</Button>
        </div>
      </div>
    </Modal>
  );
}

Publish.propTypes = {
  handleClose: PropTypes.func,
  publish: PropTypes.func,
}

export default Publish;