import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Modal from '../modal/Modal';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';

import { restApi } from '../../../restApi';


const CreatePollMoldal = ({handleClose, user}) => {
  const navigate = useNavigate();
  const [pollName, setPollName] = useState();

  const createNewPoll = async () => {
    if(pollName) {
      const poll = {
        owner_id: user.id,
        name: pollName,
      }
      const res = await restApi.createPoll(poll);
      navigate(`../new-poll?poll=${res.poll_id}&name=${pollName}`)  
    }
  }

  return (
    <Modal>
      <div className='create-poll'>
        <h5 className='create-poll__title'>Create new poll</h5>
        <Input
          id='new vote name'
          placeholder='Vote name'
          handleValueChange={event => setPollName(event.target.value)} />
        <div className='create-poll__buttons'>
          <Button
            onClick={handleClose}
            className='button create-poll__cancel'
          >
            Cancel
          </Button>
          <Button onClick={createNewPoll} > Create</Button>
        </div>
      </div>
    </Modal>
  );
}

CreatePollMoldal.propTypes = {
  handleClose: PropTypes.func,
  user: PropTypes.object,
}

export default CreatePollMoldal;