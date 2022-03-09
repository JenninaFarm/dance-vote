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
    const poll = {
      owner_id: user.id,
      name: pollName,
    }
    const res = await restApi.createPoll(poll);
    navigate(`../new-poll?poll=${res.poll_id}&name=${pollName}`)
  }

  return (
    <Modal>
      <h5>Create new poll</h5>
      <Input
        id='new vote name'
        placeholder='Vote name'
        handleValueChange={event => setPollName(event.target.value)} />
      <Button onClick={handleClose} >Cancel</Button>
      <Button onClick={createNewPoll} > Create</Button>
    </Modal>
  );
}

CreatePollMoldal.propTypes = {
  handleClose: PropTypes.func,
  user: PropTypes.object,
}

export default CreatePollMoldal;