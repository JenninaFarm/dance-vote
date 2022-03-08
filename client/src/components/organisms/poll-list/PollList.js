import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/button/Button';
import EditPoll from '../../molecules/modals/EditPoll';
import PollCard from '../../molecules/cards/PollCard';

const PollList = ({userId, getFunction}) => {
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
          name={poll.name}
        >
          {/* <Button onClick={() => handleShowEditPoll(poll.poll_id)}>Edit</Button>
          {(showEditPoll && pollIdShown === poll.poll_id) && (
            <EditPoll>
              <Button onClick={() => setShowEditPoll(false)}>Close</Button>
            </EditPoll>
          )} */}
        </PollCard>
      ))}
    </div>
  );
}

PollList.propTypes = {
  userId: PropTypes.number,
  getFunction: PropTypes.func,
}

export default PollList;
