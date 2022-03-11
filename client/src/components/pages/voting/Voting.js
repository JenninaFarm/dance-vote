import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { Container, Draggable} from 'react-smooth-dnd';

import { ENDPOINT, restApi } from '../../../restApi';
import Card from '../../molecules/cards/Card';
import socketIoClient from 'socket.io-client';
import Button from '../../atoms/button/Button';
import PairCard from '../../molecules/cards/PairCard';

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
    console.log(pairs);
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
    if(pollId) {
      fetchPairs();
    }
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
    setPairs(result);
  }

  const handleSendVote = async () => {
    console.log(pairs);
    let votes = '{';
    for(let i=0; i<pairs.length; i++) {
      if (i === pairs.length - 1) {
        votes += pairs[i].poll_item_id + '}';
      } else {
        votes += pairs[i].poll_item_id + ', ';
      }
    }
    const voteObject = {
      vote: votes,
      poll_id: pollId,
    }
    try {
      await restApi.sendVote(voteObject);
      console.log('vote recorded');
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <h1>Voting on {pollName} {pollId} </h1>
      <Container onDrop={handleDrop}>
        {pairs.map((item, index) => (
            <Draggable key={index}>
              <PairCard
                id={index}
                key={index}
                leader={item.leader}
                follower={item.follower}
              />
            </Draggable>
        ))}
      </Container>
      <Button onClick={handleSendVote} >Send Your Vote </Button>
    </div>
  );
}

Voting.propTypes = {
  pollCode: PropTypes.string,
}

export default Voting;