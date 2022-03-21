import React, { useState } from 'react';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";
import { restApi } from '../../../restApi';

const EditUserName = ({user, handleChange}) => {
  const [name, setName] = useState();

  const handleSave = async () => {
    if (name.length > 0) {
      const res = await restApi.changeUsernameById({username: name, id: user.id});
      if(res.rowCount) {
        handleChange(name);
      }
    } else {
      console.log('Username should have some length');
    }
  }

  return (
    <section>
      <EditUserHeader clickSave={handleSave} navigateTo='../user' />
      <InputWithButton
        inputId='username'
        labelContent='Username'
        valueSet={user.username}
        disabled={true}
        handleValueChange={value => setName(value)}
      >
        <Edit />
      </InputWithButton>
    </section>
  );
}

export default EditUserName;