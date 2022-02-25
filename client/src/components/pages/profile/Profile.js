import React from 'react';
import { restApi } from '../../../restApi';

import InputWithNavigation from '../../molecules/fieldsets/InputWithNavigation';
import MyPolls from '../../organisms/my-polls/MyPolls';

const Profile = ({user}) => {

  return (
    <div>
      <h1>Profile of {user.username} id: {user.id} </h1>
      <p> TODO: logout</p>
      <p> TODO: change password</p>
      <MyPolls userId={user.id} getFunction={restApi.getOnGoingPollsByOwner} />
      <InputWithNavigation
        labelContent='Create new poll'
        buttonText='create'
        placeholder='poll name'
        inputId='newPoll'
        navBase='../new-poll'
        queryParam='poll'
      />
    </div>
  );
}

export default Profile;