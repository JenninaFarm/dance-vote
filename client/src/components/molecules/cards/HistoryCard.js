import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import { restApi } from '../../../restApi';

const HistoryCard = ({id, name}) => {
  const [votes, setVotes] = useState([]);


  useEffect(() => {
    const getVotes = async () => {
      const res = await restApi.getVotesByPollId(id);
      setVotes(res);
    }

    if(id) {
      getVotes();
    }
  }, [id]);

  return (
    <Card className='history-card' >
      <Delete className='history-card__delete' />
      <h3 className='history-card__title'>{name}</h3>
      <p>Vote amount: {votes.length}</p>
    </Card>
  );
}

HistoryCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

export default HistoryCard;