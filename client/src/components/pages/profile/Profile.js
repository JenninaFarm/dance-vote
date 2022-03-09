import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restApi } from '../../../restApi';

import InputWithButton from '../../molecules/fieldsets/InputWithButton';
import CreatePollMoldal from '../../molecules/modals/CreatePollModal';
import ProfileHeader from '../../organisms/headers/ProfileHeader';
import NavigationBar from '../../organisms/navigation-bar/NavigationBar';
import PollList from '../../organisms/poll-list/PollList';

const Profile = ({user}) => {
  const navigate = useNavigate();
  const [createPollOpen, setCreatePollOpen] = useState(false);

  const createNewPoll = async (pollName) => {
    const poll = {
      owner_id: user.id,
      name: pollName,
    }
    const res = await restApi.createPoll(poll);
    navigate(`../new-poll?poll=${res.poll_id}&name=${pollName}`)
  }

  const handleOpenCreatePoll = () => {
    setCreatePollOpen(!createPollOpen);
  }

  return (
    <div className='profile'>
      <NavigationBar clickPlus={handleOpenCreatePoll} />
      <ProfileHeader userName={user.username} />
      <PollList userId={user.id} getFunction={restApi.getOnGoingPollsByOwner} />
      {createPollOpen && <CreatePollMoldal handleClose={handleOpenCreatePoll} user={user} />} 
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