import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as User} from "../../../images/icons/user.svg";


const ProfileHeader = ({userName}) => {
  return (
    <header className='profile-header'>
      <h6 className='profile-header__name' >{userName}</h6>
      <p> TODO: user-link</p>
      <User className='profile-header__user-icon' />
    </header>
  );
}

ProfileHeader.propTypes = {
  userName: PropTypes.string,
}

export default ProfileHeader;