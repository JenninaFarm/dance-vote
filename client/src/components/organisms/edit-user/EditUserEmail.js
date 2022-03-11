import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";
import { restApi } from '../../../restApi';

const EditUserEmail = ({user, handleChange}) => {
  const [email, setEmail] = useState();

  const handleSave = async () => {
    if (email.length > 0) {
      const res = await restApi.changeEmailById({email: email, id: user.id});
      if(res.rowCount) {
        handleChange(email);
      }
    } else {
      console.log('Email should have some length');
    }
  }

  return (
    <section>
      <EditUserHeader clickSave={handleSave} />
      <InputWithButton
        inputId='username'
        type='email'
        labelContent='Email'
        valueSet={user.email}
        handleValueChange={value => setEmail(value)}
      >
        <Edit />
      </InputWithButton>
    </section>
  );
}

export default EditUserEmail;