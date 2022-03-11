import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { restApi } from '../../../restApi';

import CreatePollMoldal from '../../molecules/modals/CreatePollModal';
import EditUser from '../../organisms/edit-user/EditUser';
import EditUserEmail from '../../organisms/edit-user/EditUserEmail';
import EditUserName from '../../organisms/edit-user/EditUserName';
import ProfileHeader from '../../organisms/headers/ProfileHeader';
import NavigationBar from '../../organisms/navigation-bar/NavigationBar';
import PollList from '../../organisms/poll-list/PollList';
import EditPoll from '../edit-poll/EditPoll';

const Profile = ({userObj}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userObj);
  const [createPollOpen, setCreatePollOpen] = useState(false);
  
  const handleOpenCreatePoll = () => {
    setCreatePollOpen(!createPollOpen);
  }

  const handleNameChange = (newName) => {
    let temp = user;
    temp.username = newName;
    setUser(temp);
  }

  const handleEmailChange = (newEmail) => {
    let temp = user;
    temp.email = newEmail;
    setUser(temp);
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
        <Route path='/new-poll' element={<EditPoll userId={user.id} />}/>
        <Route path='/user/*' element={<EditUser user={user} />} />
        <Route path='user/edit-username' element={<EditUserName handleChange={handleNameChange} user={user} />} />
        <Route path='user/edit-email' element={<EditUserEmail handleChange={handleEmailChange} user={user} />} />
      </Routes>
      {createPollOpen && <CreatePollMoldal handleClose={handleOpenCreatePoll} user={user} />} 
      <p> TODO: logout</p>
      <p> TODO: change password</p>
    </div>
  );
}

export default Profile;