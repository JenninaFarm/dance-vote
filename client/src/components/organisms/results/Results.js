import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restApi } from '../../../restApi';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState([]);

  useState(() => {
    const getPoll = async (id) => {
      const resultArray = await restApi.getResultsByPollId(id);
      for (const id of resultArray) {
        const pair = await restApi.getPollItemById(id);
        setResult(result => [...result, pair]);
      }
    }

    if (result.length === 0) {
      getPoll(searchParams.get('poll-id'));
    }
  });


  return (
    <div className='result'>
      <h2 className='result__title'>{searchParams.get('poll-name')}</h2>
      {result.map((pair, index) => (
        <p className='result__pair' key={pair.poll_item_id}>{(index + 1) + ': ' + pair.leader + ' & ' + pair.follower}</p>
      ))}
    </div>
  );
}

export default Results;