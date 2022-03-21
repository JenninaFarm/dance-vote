import React, { useEffect, useState } from 'react';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";
import { restApi } from '../../../restApi';
import { useSearchParams } from 'react-router-dom';

const EditPollPair = () => {
  const [searchParams] = useSearchParams();

  const [pollId, setPollId] = useState();
  const [pairId, setPairId] = useState();
  const [follower, setFollower] = useState();
  const [leader, setleader] = useState();

  const handleSave = async () => {
    if (follower && leader) {
      const res = await restApi.setPairByPollItemId({follower: follower, leader: leader, id: pairId});
      if(res.rowCount) {
        console.log('Change success');
      }
    } else {
      console.log('Email should have some length');
    }
  }

  useEffect(() => {
    const getPair = async (id) => {
      const res = await restApi.getPollItemById(id);
      setPairId(res.poll_item_id);
      setFollower(res.follower);
      setleader(res.leader);
      setPollId(res.poll_id);
    }
    if(searchParams) {
      getPair(searchParams.get('pair-id'));

    }
  }, [searchParams])

  return (
    <section>
      <EditUserHeader clickSave={handleSave} navigateTo={`../new-poll?poll=${pollId}&name=`}/>
      <InputWithButton
        inputId='leader'
        labelContent='Leader'
        valueSet={leader}
        disabled={true}
        handleValueChange={value => setleader(value)}
      >
        <Edit />
      </InputWithButton>
      <InputWithButton
        inputId='follower'
        labelContent='Follower'
        valueSet={follower}
        disabled={true}
        handleValueChange={value => setFollower(value)}
      >
        <Edit />
      </InputWithButton>
    </section>
  );
}

export default EditPollPair;