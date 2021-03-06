import React, { useEffect, useState } from 'react';
import { restApi } from '../../../restApi';
import PairCardResult from '../../molecules/cards/PairCardResult';
import Header from '../../organisms/headers/Header';

const Results = () => {
  const [results, setResults] = useState([]);
  const [pollNames, setPollNames] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await restApi.getPublicResults();
      if (res.length > 0) {
        for (const result of res) {
          const pairs = [];
          for (const pair of result.result_array) {
            const pairObj = await restApi.getPollItemById(pair);
            if(pairObj.poll_item_id) {
              pairs.push(pairObj);
            }
          }
          setResults((results) => [...results, pairs]);
          const poll = await restApi.getPollById(pairs[0].poll_id);
          if(poll.name) {
            setPollNames((pollNames) => [...pollNames, poll.name]);
          }
        }
      }
    }

    if(results.length === 0) {
      fetch();
    }
  }, [results]);

  return (
    <div className='results'>
      <Header />

      {results.map((result, index) => (
        <div key={index}>
          <p className='results__poll-name'>{pollNames[index]}</p>
          <div className='results__title-container'>
            <p className='results__leader-title'>Leader</p>
            <p className='results__follower-title'>Follower</p>
          </div>
          {result.map((pair, index) => (
              <PairCardResult
                key={pair.poll_item_id}
                id={index}
                follower={pair.follower}
                leader={pair.leader}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Results;