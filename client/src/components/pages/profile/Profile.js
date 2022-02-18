import React from 'react';
import ButtonWithNav from '../../atoms/button/ButtonWithNav';

import InputWithNavigation from '../../molecules/fieldsets/InputWithNavigation';

const Profile = ({user}) => {

  const createNewPoll = () => {
    console.log('click');
  }

  return (
    <div>
      <h1>Profile of {user.username} </h1>
      <p> TODO: logout</p>
      <p> TODO: change password</p>
      <InputWithNavigation
        labelContent='Create new poll'
        buttonText='create'
        onClick={createNewPoll}
        placeholder='poll name'
        inputId='newPoll'
        navBase='../new-poll'
        queryParam='poll'
      />
    </div>
  );
}

export default Profile;