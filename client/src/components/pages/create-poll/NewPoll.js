import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import NewPair from '../../molecules/fieldsets/NewPair';
import Card from '../../molecules/cards/Card';

const NewPoll = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    console.log(searchParams.get('poll'));
  }, [searchParams])

  return (
    <div>
      <h1> New Poll </h1>
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