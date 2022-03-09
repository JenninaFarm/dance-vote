import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as User} from "../../../images/icons/user.svg";
import Button from '../../atoms/button/Button';


const ProfileHeader = ({userName, clickUser}) => {
  return (
    <header className='profile-header'>
      <h6 className='profile-header__name' >{userName}</h6>
      <p> TODO: user-link</p>
      <Button onClick={clickUser} className='button button--icon profile-header__user-icon' >
        <User />
      </Button>
    </header>
  );
}

ProfileHeader.propTypes = {
  userName: PropTypes.string,
  clickUser: PropTypes.func,
}

export default ProfileHeader;