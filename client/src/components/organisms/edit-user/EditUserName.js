import React, { useState } from 'react';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";
import { restApi } from '../../../restApi';

const EditUserName = ({user, handleChange}) => {
  const [name, setName] = useState();

  const handleSave = async () => {
    console.log(name);
    if (name.length > 0) {
      const res = await restApi.changeUsernameById({username: name, id: user.id});
      console.log(res);
      if(res.rowCount) {
        handleChange(name);
        console.log('username updated');
      }
    } else {
      console.log('Username should have some length');
    }
  }

  return (
    <section>
      <EditUserHeader clickSave={handleSave} />
      <InputWithButton
        inputId='username'
        labelContent='Username'
        valueSet={user.username}
        handleValueChange={value => setName(value)}
      >
        <Edit />
      </InputWithButton>
    </section>
  );
}

export default EditUserName;