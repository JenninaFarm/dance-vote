import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restApi } from '../../../restApi';

import InputWithButton from '../../molecules/fieldsets/InputWithButton';
import ProfileHeader from '../../organisms/headers/ProfileHeader';
import NavigationBar from '../../organisms/navigation-bar/NavigationBar';
import PollList from '../../organisms/poll-list/PollList';

const Profile = ({user}) => {
  const navigate = useNavigate();

  const createNewPoll = async (pollName) => {
    const poll = {
      owner_id: user.id,
      name: pollName,
    }
    const res = await restApi.createPoll(poll);
    navigate(`../new-poll?poll=${res.poll_id}&name=${pollName}`)
  }

  return (
    <div className='profile'>
      <NavigationBar />
      <ProfileHeader userName={user.username} />
      <PollList userId={user.id} getFunction={restApi.getOnGoingPollsByOwner} />
      <InputWithButton
        labelContent='Create new poll'
        buttonText='create'
        onClick={createNewPoll}
        placeholder='poll name'
        inputId='newPoll'
      />
      <p> TODO: logout</p>
      <p> TODO: change password</p>
    </div>
  );
}

export default Profile;