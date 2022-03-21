import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../atoms/button/Button';
import Modal from '../modal/Modal';

const Vote = ({handleClose, submit, pairs}) => {
  return (
    <Modal >
      <div className='vote'>
        <h3 className='vote__title'>Are you happy with pair order?</h3>
        {pairs.map((pair, index) => (
          <p key={pair.poll_item_id} className='vote__pair'>
            {(index + 1) + ': ' + pair.leader + ' & ' + pair.follower}
          </p>
        ))}
        <div className='vote__buttons'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Send vote</Button>
        </div>
      </div>
    </Modal>
  );
}

Vote.propTypes = {
  handleClose: PropTypes.func,
  submit: PropTypes.func,
  pairs: PropTypes.array,
}

export default Vote;