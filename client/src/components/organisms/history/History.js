import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { restApi } from '../../../restApi';
import HistoryCard from '../../molecules/cards/HistoryCard';

const History = ({user_id}) => {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const getGonePolls = async () => {
      const res = await restApi.getGonePollsById({user_id: user_id});
      setPairs(res);
    }

    if(user_id) {
      getGonePolls();
    }
  }, [user_id]);

  return (
    <section>
      <h4>History</h4>
      {pairs && pairs.map(poll => (
        <HistoryCard 
          key={poll.poll_id}
          id={poll.poll_id}
          name={poll.name}
        />
      ))}

    </section>
  );
}

History.propTypes = {
  user_id: PropTypes.number,
}

export default History;