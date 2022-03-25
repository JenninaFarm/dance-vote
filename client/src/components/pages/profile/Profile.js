import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { restApi } from '../../../restApi';
import AccessCode from '../../molecules/access-code/AccessCode';

import CreatePollMoldal from '../../molecules/modals/CreatePollModal';
import EditUser from '../../organisms/edit-user/EditUser';
import EditUserEmail from '../../organisms/edit-user/EditUserEmail';
import EditUserName from '../../organisms/edit-user/EditUserName';
import EditUserPassword from '../../organisms/edit-user/EditUserPassword';
import ProfileHeader from '../../organisms/headers/ProfileHeader';
import History from '../../organisms/history/History';
import NavigationBar from '../../organisms/navigation-bar/NavigationBar';
import PollList from '../../organisms/poll-list/PollList';
import Results from '../../organisms/results/Results';
import EditPoll from '../../organisms/edit-poll/EditPoll';
import EditPollName from '../../organisms/edit-poll/EditPollName';
import EditPollPairAmount from '../../organisms/edit-poll/EditPollPairAmount';
import EditPollPair from '../../organisms/edit-poll/EditPollPair';
import Header from '../../organisms/headers/Header';

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
      <Header />
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
        <Route path='/new-poll/edit-pair' element={<EditPollPair />}/>
        <Route path='/new-poll/edit-name' element={<EditPollName />}/>
        <Route path='/new-poll/edit-pair-amount' element={<EditPollPairAmount />}/>
        <Route path='/history' element={<History user_id={user.id} />}/>
        <Route path='/results' element={<Results />}/>
        <Route path='/user/*' element={<EditUser user={user} />} />
        <Route path='user/edit-username' element={<EditUserName handleChange={handleNameChange} user={user} />} />
        <Route path='user/edit-email' element={<EditUserEmail handleChange={handleEmailChange} user={user} />} />
        <Route path='user/edit-password' element={<EditUserPassword user={user} />} />
        <Route path='access-code' element={<AccessCode />} />
      </Routes>
      {createPollOpen && <CreatePollMoldal handleClose={handleOpenCreatePoll} user={user} />} 
    </div>
  );
}

export default Profile;