import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restApi } from '../../../restApi';

import InputWithButton from '../../molecules/fieldsets/InputWithButton';
import MyPolls from '../../organisms/my-polls/MyPolls';

const Profile = ({user}) => {
  const navigate = useNavigate();

  const createNewPoll = async (pollName) => {
    const poll = {
      owner_id: user.id,
      name: pollName,
    }
    const res = await restApi.createPoll(poll);
    navigate(`../new-poll?poll=${res.poll_id}name=${pollName}`)
  }

  return (
    <div>
      <h1>Profile of {user.username} id: {user.id} </h1>
      <p> TODO: logout</p>
      <p> TODO: change password</p>
      <MyPolls userId={user.id} getFunction={restApi.getOnGoingPollsByOwner} />
      <InputWithButton
        labelContent='Create new poll'
        buttonText='create'
        onClick={createNewPoll}
        placeholder='poll name'
        inputId='newPoll'
      />
    </div>
  );
}

export default Profile;