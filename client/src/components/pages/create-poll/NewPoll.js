import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NewPair from '../../molecules/fieldsets/NewPair';
import Card from '../../molecules/cards/Card';
import { restApi } from '../../../restApi';
import { createUniqueId } from '../../../HelperFunctions';

const NewPoll = ({userId}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pollName, setPollName] = useState();
  const [follower, setFollower] = useState();
  const [leader, setLeader] = useState();
  const [pairs, setPairs] = useState([]);
  const [accessCode, setAccessCode] = useState();

  const fetchPairs = (newPair) => {
    console.log('fetch pairs and update pair cards');
    newPair.push(...pairs);
    setPairs(newPair);
  }

  const sendNewPair = () => {
    console.log(`${follower} ja ${leader}`);
    const newPair = [{leader: leader, follow: follower}]
    fetchPairs(newPair);
  }

  useEffect(() => {
    setPollName(searchParams.get('name'));

    const createPollAccessCode = async () => {
      const accessCode = createUniqueId(searchParams.get('poll'));
      const accessPoll = {
        poll_id: searchParams.get('poll'),
        access_code: accessCode,
      }
      await restApi.setPollAccessCode(accessPoll);
      setAccessCode(accessCode);
    }

    if (!pollName) {
      createPollAccessCode();
    }
  }, [pollName, searchParams]);

  return (
    <div>
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

NewPoll.propTypes = {
  pollName: PropTypes.string,
}

export default NewPoll;