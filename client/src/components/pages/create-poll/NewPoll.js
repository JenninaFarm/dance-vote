import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NewPair from '../../molecules/fieldsets/NewPair';
import Card from '../../molecules/cards/Card';
import { restApi } from '../../../restApi';

const NewPoll = ({userId}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pollName, setPollName] = useState();
  const [follower, setFollower] = useState();
  const [leader, setLeader] = useState();
  const [pairs, setPairs] = useState([]);

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
    setPollName(searchParams.get('poll'));

    const sendPoll = async (poll) => {
      const res = await restApi.createPoll(poll);
      console.log(res);
    }

    if (searchParams.get('poll')) {
      const poll = {
        owner_id: userId,
        name: searchParams.get('poll'),
        access_code: '00000',
      }
      sendPoll(poll);
      console.log(poll);
    }
  }, [searchParams])

  return (
    <div>
      <h1> New Poll: {pollName} </h1>
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