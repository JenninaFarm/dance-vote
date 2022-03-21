import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import { restApi } from '../../../restApi';
import { arrayOfObjectsTo2DArray, countVotes } from '../../../HelperFunctions';

const HistoryCard = ({id, name}) => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const getVotes = async () => {
      const res = await restApi.getVotesByPollId(id);
      console.log(res);
      const example = [[151, 152, 153, 154, 155],
        [152, 151, 155, 153, 154],
        [153, 154, 152, 151, 155],
        [151, 152, 155, 153, 154],
        [152, 153, 151, 154, 155],
      ];

      const resolveWithSum = [[151, 153, 152, 154, 155],
      [155, 152, 151, 153, 154],
      [153, 154, 152, 151, 155],
      [152, 151, 155, 153, 154],
      [152, 151, 153, 154, 155],
    ];

      const resolveWithNextLevel = [[151, 152, 153, 154, 155],
        [151, 152, 155, 153, 154],
        [153, 154, 152, 151, 155],
        [152, 151, 155, 153, 154],
        [152, 151, 153, 154, 155],
      ];

      const exampleInWSDC = [
        [17, 14, 19, 13, 11, 15, 112, 110, 18, 12, 16, 111],
        [12, 19, 14, 17, 110, 15, 13, 111, 18, 112, 16, 11],
        [19, 17, 16, 112, 14, 11, 13, 110, 15, 111, 18, 12],
        [14, 17, 12, 15, 112, 110, 19, 18, 13, 16, 111, 11],
        [14, 15, 19, 16, 18, 13, 12, 112, 11, 17, 111, 110],
        [19, 14, 13, 110, 112, 18, 15, 12, 17, 16, 111, 11],
        [19, 14, 17, 112, 13, 110, 12, 15, 18, 11, 16, 111],
      ];

      const resolveWithJudgeComparison = [
        [11, 12, 13],
        [12, 11, 13],
        [11, 13, 12],
        [12, 11, 13],
        [13, 12, 11],
        [12, 11, 13],
        [11, 12, 13],
      ];
      // console.log(arrayOfObjectsTo2DArray(res));
      // countVotes(resolveWithJudgeComparison);
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