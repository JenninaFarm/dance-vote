import React, { useEffect, useState } from 'react';
import { restApi } from '../../../restApi';
import Header from '../../organisms/headers/Header';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = restApi.getPublicVotes();
      console.log(res);
    }

    if(results.length === 0) {
      fetch();
    }
  }, [results])

  return (
    <div className='results'>
      <Header />
      <div> Jotain</div>
    </div>
  );
}

export default Results;