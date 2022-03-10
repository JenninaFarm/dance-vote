import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { restApi } from '../../../restApi';

import CreatePollMoldal from '../../molecules/modals/CreatePollModal';
import ProfileHeader from '../../organisms/headers/ProfileHeader';
import NavigationBar from '../../organisms/navigation-bar/NavigationBar';
import PollList from '../../organisms/poll-list/PollList';
import EditPoll from '../edit-poll/EditPoll';

const Profile = ({user}) => {
  const navigate = useNavigate();
  const [createPollOpen, setCreatePollOpen] = useState(false);

  const handleOpenCreatePoll = () => {
    setCreatePollOpen(!createPollOpen);
  }

  return (
    <div className='profile'>
      <NavigationBar
        clickHome={() => navigate('/profile')}
        clickPlus={handleOpenCreatePoll}
        clickHistory={() => navigate('history')}
      />
      <ProfileHeader
        userName={user.username}
        clickUser={() => navigate('user')}
      />
      <Routes>
        <Route path='/' element={<PollList userId={user.id} getFunction={restApi.getOnGoingPollsByOwner} />}/>
        <Route path='/muu' element={<ProfileHeader />} />
        <Route path='/new-poll' element={<EditPoll userId={user.id} />}/>
        <Route path='/user' element={<ProfileHeader />} />
      </Routes>
      {createPollOpen && <CreatePollMoldal handleClose={handleOpenCreatePoll} user={user} />} 
      <p> TODO: logout</p>
      <p> TODO: change password</p>
    </div>
  );
}

export default Profile;