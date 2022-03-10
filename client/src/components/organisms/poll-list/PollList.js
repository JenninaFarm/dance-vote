import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PollCard from '../../molecules/cards/PollCard';

const PollList = ({userId, getFunction}) => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getFunction(userId);
      if(response) {
        setPolls(response);
      }
    }
    fetch();
  }, [userId, getFunction]);

  return (
    <div className='poll-list' >
      <h5 className='poll-list__title' > You have {polls.length} on-going votes </h5>
      {!polls && (
        <div>
          Loading polls
        </div>
      )}
      {polls.map(poll => (
        <PollCard
          key={poll.poll_id}
          id={poll.poll_id}
          name={poll.name}
        />
      ))}
    </div>
  );
}

PollList.propTypes = {
  userId: PropTypes.number,
  getFunction: PropTypes.func,
}

export default PollList;
