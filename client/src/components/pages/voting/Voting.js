import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { Container, Draggable} from 'react-smooth-dnd';

import { ENDPOINT, restApi } from '../../../restApi';
import Card from '../../molecules/cards/Card';
import socketIoClient from 'socket.io-client';

const socket = socketIoClient(ENDPOINT, {
  transports: ['websocket'],
});

const Voting = () => {
  const [searchParams] = useSearchParams();
  const [pollName, setPollName] = useState();
  const [pollId, setPollId] = useState();
  const [pairs, setPairs] = useState([]);

  // Handling listening socket for updates
  useEffect(() => {
    socket.on('poll-update', newPair => {
      if (newPair.access_code === searchParams.get('poll_id')) {
        setPairs([...pairs, newPair]);
      }
    });
  });

  // Handling fetching existing poll items at the start
  useEffect(() => {
    const fetchPairs = async () => {
      const res = await restApi.getPollItemsByPollId(pollId);
      setPairs(res);
    }
    fetchPairs();

  }, [pollId]);

  // Handling fetching poll at the start
  useEffect(() => {
    const fetchPoll = async (accessCode) => {
      const response = await restApi.getOnGoingPollByAccessCode(accessCode);
      setPollName(response[0].name);
      setPollId(response[0].poll_id);
    }

    if (!pollName) {
      fetchPoll(searchParams.get('poll_id'));
    }
  });

  const handleDrop = (e) => {
    const { removedIndex, addedIndex, payload } = e;

    const result = [...pairs];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    console.log(result);
    setPairs(result);
  }
  
  return (
    <div>
      <h1>Voting on {pollName} </h1>
      <Container onDrop={handleDrop}>
          {pairs.map((item, index) => (
              <Draggable key={index}>
                <Card
                  key={index}
                  content={`${item.leader} & ${item.follower}`}
                />
              </Draggable>
          ))}
        </Container>
    </div>
  );
}

Voting.propTypes = {
  pollCode: PropTypes.string,
}

export default Voting;