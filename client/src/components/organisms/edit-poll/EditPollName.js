import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";
import { restApi } from '../../../restApi';
import { useSearchParams } from 'react-router-dom';

const EditPollName = () => {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState();
  const [pollId, setPollId] = useState();

  const handleSave = async () => {
    if (name.length > 0) {
      const res = await restApi.setPollNameById({name: name, id: pollId});
      if(res.rowCount) {
        console.log('Change success');
      }
    } else {
      console.log('Email should have some length');
    }
  }

  useEffect(() => {
    const getPoll = async (id) => {
      const res = await restApi.getPollById(id);
      setPollId(res.poll_id);
      setName(res.name);
    }
    if(searchParams) {
      getPoll(searchParams.get('poll_id'));

    }
  }, [searchParams])

  return (
    <section>
      <EditUserHeader clickSave={handleSave} navigateTo={`../new-poll?poll=${pollId}&name=${name}`}/>
      <InputWithButton
        inputId='vote-name'
        labelContent='Vote name'
        valueSet={name}
        disabled={true}
        handleValueChange={value => setName(value)}
      >
        <Edit />
      </InputWithButton>
    </section>
  );
}

EditPollName.propTypes = {
  user: PropTypes.object,
  handleChange: PropTypes.func,
}

export default EditPollName;