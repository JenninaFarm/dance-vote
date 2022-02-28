import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import { restApi } from '../../../restApi';
import Card from '../../molecules/cards/Card';

const Voting = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pollName, setPollName] = useState();
  const [pollId, setPollId] = useState();
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const fetchPairs = async () => {
      const res = await restApi.getPollItemsByPollId(pollId);
      setPairs(res);
    }
    fetchPairs();

  }, [pollId]);

  useEffect(() => {
    const fetch = async (accessCode) => {
      const response = await restApi.getOnGoingPollByAccessCode(accessCode);
      setPollName(response[0].name);
      setPollId(response[0].poll_id);
    }

    if (!pollName) {
      fetch(searchParams.get('poll_id'));
    }
  });
  
  return (
    <div>
      <h1>Voting on {pollName} </h1>
      {pairs.map((pair, index) => (
        <Card
          key={index}
          content={`${pair.leader} & ${pair.follower}`}
        />
      ))}
    </div>
  );
}

Voting.propTypes = {
  pollCode: PropTypes.string,
}

export default Voting;