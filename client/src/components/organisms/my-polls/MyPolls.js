import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { restApi } from '../../../restApi';

const MyPolls = ({userId}) => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await restApi.getPollsByOwner(userId);
      if(response) {
        setPolls(response);
      }
    }
    fetch();
  }, [userId]);

  return (
    <div>
      <h3>My polls</h3>
      {polls.map(poll => (
        <div key={poll.poll_id}>
         {poll.name}
        </div>
      ))}
    </div>
  );
}

MyPolls.propTypes = {
  userId: PropTypes.number,
}

export default MyPolls;
