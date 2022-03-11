import React, { useState } from 'react';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";

const EditUserName = ({user}) => {
  const [name, setName] = useState();

  const handleSave = () => {
    console.log('Save new name');
  }

  return (
    <section>
      <EditUserHeader clickSave={handleSave} />
      <InputWithButton inputId='username' labelContent='Username' valueSet={user.username} handleValueChange={value => setName(value)} >
        <Edit />
      </InputWithButton>
    </section>
  );
}

export default EditUserName;