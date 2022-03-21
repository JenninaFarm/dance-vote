import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import { restApi } from '../../../restApi';
import Button from '../../atoms/button/Button';
import { useNavigate } from 'react-router-dom';

const HistoryCard = ({id, name}) => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getVotes = async () => {
      const voteRes = await restApi.getVotesByPollId(id);
      const res = await restApi.getResultsByPollId(id);
      const length = res.length >= 3 ? 3 : res.length;
      for( let i = 0; i < length; i++) {
        const pair = await restApi.getPollItemById(res[i]);
        setResult(result => [...result, pair]);
      }
      setVotes(voteRes);
    }

    if(id && result.length === 0) {
      getVotes();
    }
  }, [id, result]);

  return (
    <Card className='history-card' >
      <div className='history-card__header'>
        <div className='history-card__title-container'>
          <h3 className='history-card__title'>{name}</h3>
        </div>
        <Delete className='history-card__delete' />
      </div>
      <div className='history-card__content'>
        <p>Number of Votes: {votes.length}</p>
        <p>Top Three:</p>
        {result.map(pair => (
          <p key={pair.poll_item_id}>{pair.leader + ' & ' + pair.follower}</p>
        ))}
        <Button className='button button--secondary' onClick={() => navigate(`../results?poll-id=${id}`)}>
          View Results
        </Button>
      </div>
    </Card>
  );
}

HistoryCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

export default HistoryCard;