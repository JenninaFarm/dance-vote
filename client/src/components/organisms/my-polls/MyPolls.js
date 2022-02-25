import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/button/Button';
import EditPoll from '../../molecules/modals/EditPoll';

const MyPolls = ({userId, getFunction}) => {
  const [polls, setPolls] = useState([]);
  const [showEditPoll, setShowEditPoll] = useState(false);
  const [pollIdShown, setPollIdShown] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await getFunction(userId);
      if(response) {
        setPolls(response);
      }
    }
    fetch();
  }, [userId, getFunction]);

  const handleShowEditPoll = (pollId) => {
    setShowEditPoll(true);
    setPollIdShown(pollId);
  }

  return (
    <div>
      <h3>My polls</h3>
      {!polls && (
        <div>
          Loading polls
        </div>
      )}
      {polls.map(poll => (
        <div key={poll.poll_id}>
          {poll.name} 
          <Button onClick={() => handleShowEditPoll(poll.poll_id)}>Edit</Button>
          {(showEditPoll && pollIdShown === poll.poll_id) && (
            <EditPoll>
              <Button onClick={() => setShowEditPoll(false)}>Close</Button>
            </EditPoll>
          )}
        </div>
      ))}
    </div>
  );
}

MyPolls.propTypes = {
  userId: PropTypes.number,
  getFunction: PropTypes.func,
}

export default MyPolls;
