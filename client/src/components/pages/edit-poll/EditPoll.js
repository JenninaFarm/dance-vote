import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NewPair from '../../molecules/fieldsets/NewPair';
import Card from '../../molecules/cards/Card';
import { restApi } from '../../../restApi';
import EditPollHeader from '../../organisms/headers/EditPollHeader';
import Label from '../../atoms/label/Label';
import InputWithButton from '../../atoms/input/InputWithButton';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";


const EditPoll = () => {
  const [searchParams] = useSearchParams();
  const [pollName, setPollName] = useState();
  const [pollId, setPollId] = useState();
  const [follower, setFollower] = useState();
  const [leader, setLeader] = useState();
  const [pairs, setPairs] = useState([]);
  const [accessCode, setAccessCode] = useState();

  const updatePairs = (newPair) => {
    newPair.push(...pairs);
    setPairs(newPair);
  }

  const sendNewPair = async () => {
    const pollItem = {
      leader: leader,
      follower: follower,
      poll_id: searchParams.get('poll'),
      access_code: accessCode,
    }
    await restApi.createPollItem(pollItem);
    const newPair = [{leader: leader, follow: follower}];
    updatePairs(newPair);
  }

  // Get Poll access code after the pollId is set
  useEffect(() => {
    const getPollAccessCode = async () => {
      const result = await restApi.getPollAccessCodeByPollId(pollId);
      setAccessCode(result[0].access_code);
    }

    if (pollId && !accessCode) {
      getPollAccessCode();
    }
  }, [pollId]);

  // Set Poll name and id
  useEffect(() => {
    setPollName(searchParams.get('name'));
    setPollId(searchParams.get('poll'));
  }, [searchParams]);

  return (
    <div>
      <EditPollHeader />
      <Label />
      <InputWithButton > <Edit /> </InputWithButton>
      <h1> New Poll: {pollName} </h1>
      <h2> Access code: {accessCode} </h2>
      <NewPair
        onClick={sendNewPair}
        setLeader={value => setLeader(value)}
        setFollower={value => setFollower(value)}
      />
      {pairs.map((pair, index) => (
        <Card
          key={index}
          content={`${pair.leader} & ${pair.follow}`}
        />
      ))}
    </div>
  )
}

EditPoll.propTypes = {
  pollName: PropTypes.string,
}

export default EditPoll;