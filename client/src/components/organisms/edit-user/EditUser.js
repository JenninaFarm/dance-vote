import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import Button from '../../atoms/button/Button';
import { NavLink, useNavigate } from 'react-router-dom';

const EditUser = ({user}) => {
  const navigate = useNavigate();
  return (
    <section className='edit-user'>
      <h5 className='edit-user__title'>Account</h5>
      <h5 className='edit-user__title-secondary'>Username</h5>
      <div className='edit-user__content'>
        <p >{user.username}</p>
        <Button onClick={() => navigate('edit-username')} className='button button--icon' >
          <Delete className='edit-user__icon'/>
        </Button>
      </div>
      
      <h5 className='edit-user__title-secondary'>Email</h5>
      <div className='edit-user__content'>
        <p >{user.email}</p>
        <Button onClick={() => navigate('edit-email')} className='button button--icon' >
          <Delete className='edit-user__icon' />
        </Button>
      </div>

      <NavLink className='edit-user__change-password' to='edit-password' >Change password</NavLink>
      <NavLink className='edit-user__delete-account' to='delete-account' >Delete account</NavLink>

     
    </section>
  );
}

EditUser.propTypes = {
  user: PropTypes.object,
}

export default EditUser;