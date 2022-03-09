import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as User} from "../../../images/icons/user.svg";
import Button from '../../atoms/button/Button';


const ProfileHeader = ({userName}) => {
  return (
    <header className='profile-header'>
      <h6 className='profile-header__name' >{userName}</h6>
      <p> TODO: user-link</p>
      <Button className='button button--icon profile-header__user-icon' >
        <User />
      </Button>
    </header>
  );
}

ProfileHeader.propTypes = {
  userName: PropTypes.string,
}

export default ProfileHeader;