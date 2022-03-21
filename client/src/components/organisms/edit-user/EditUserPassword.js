import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Eye} from "../../../images/icons/eye.svg";
import { restApi } from '../../../restApi';

const EditUserPassword = ({user}) => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleSave = async () => {
    if (oldPassword.length >= 8 && newPassword.length >= 8) {
      const res = await restApi.changePasswordById({oldPassword: oldPassword, newPassword: newPassword, id: user.id});
      console.log(res);
      // if(res.rowCount) {
      //   handleChange(password);
      // }
    } else {
      console.log('Password should have 8 characters');
    }
  }

  return (
    <section>
      <EditUserHeader clickSave={handleSave} navigateTo='../user' />
      <InputWithButton
        inputId='username'
        placeholder='Old password'
        type='password'
        labelContent='Password'
        handleValueChange={value => setOldPassword(value)}
      >
        <Eye />
      </InputWithButton>
      <InputWithButton
        placeholder='New password'
        type='password'
        handleValueChange={value => setNewPassword(value)}
      >
        <Eye />
      </InputWithButton>
    </section>
  );
}

EditUserPassword.propTypes = {
  user: PropTypes.object,
}

export default EditUserPassword;