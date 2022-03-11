import React from 'react';
import Button from '../../atoms/button/Button';
import Modal from '../modal/Modal';

const Publish = () => {
  return (
    <Modal>
      <div className='publish'>
        <h2 className='publish__title'>Are you sure you want to publish the results?</h2>
        <p className='publish__summary'>Publishing will end the vote and the results are reveived by the voters.</p>
        <div className='publish__buttons'>
          <Button>Cancel</Button>
          <Button>Publish</Button>
        </div>
      </div>
    </Modal>
  );
}

export default Publish;