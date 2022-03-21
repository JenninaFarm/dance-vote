import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';

import NewPair from '../../molecules/fieldsets/new-pair/NewPair';
import { restApi } from '../../../restApi';
import EditPollHeader from '../headers/EditPollHeader';
import PairCard from '../../molecules/cards/PairCard';
import Button from '../../atoms/button/Button';
import {ReactComponent as Arrow} from "../../../images/icons/arrow-right.svg";

const EditPoll = () => {
  const [searchParams] = useSearchParams();
  const [pollName, setPollName] = useState();
  const [pollId, setPollId] = useState();
  const [pollPairAmount, setPollPairAmount] = useState();
  const [follower, setFollower] = useState();
  const [leader, setLeader] = useState();
  const [pairs, setPairs] = useState([]);
  const [accessCode, setAccessCode] = useState();
  const navigate = useNavigate();

  const updatePairs = (newPair) => {
    newPair.push(...pairs);
    setPairs(newPair);
  }

  const sendNewPair = async () => {
    const pollItem = {
      leader: leader,
      follower: follower,
      poll_id: searchParams.get('poll'),
      access_code: accessCode,
    }
    await restApi.createPollItem(pollItem);
    const newPair = [{leader: leader, follower: follower}];
    updatePairs(newPair);
  }

  // Get Poll pairs after the pollId is set
  useEffect(() => {
    const getPairs = async () => {
      const result = await restApi.getPollItemsByPollId(pollId);
      setPairs(result);
    }

    if (pollId) {
      getPairs();
    }
  }, [pollId]);

  // Get Poll access code after the pollId is set
  useEffect(() => {
    const getPollAccessCode = async () => {
      const result = await restApi.getPollAccessCodeByPollId(pollId);
      const result2 = await restApi.getPollItemAmountByPollId(pollId);
      setPollPairAmount(result2.number_of_items);
      setAccessCode(result[0].access_code);
    }

    if (pollId && !accessCode) {
      getPollAccessCode();
    }
  }, [pollId, accessCode]);

  // Set Poll name and id
  useEffect(() => {
    setPollName(searchParams.get('name'));
    setPollId(searchParams.get('poll'));
  }, [searchParams]);

  return (
    <div className='edit-poll'>
      <EditPollHeader />
      <h5 className='edit-poll__'>Vote name</h5>
      <div className='edit-poll__'>
        <p>{pollName}</p>
        <Button onClick={() => navigate(`edit-name?edit=name&poll_id=${pollId}`)} className='button button--icon' >
          <Arrow className='edit-poll__icon'/>
        </Button>
      </div>
      <h5 className='edit-poll__'>Vote pair amount</h5>
      <div className='edit-poll__'>
        <p>{pollPairAmount}</p>
        <Button onClick={() => navigate('edit-pair-amount')} className='button button--icon' >
          <Arrow className='edit-poll__icon'/>
        </Button>
      </div>

      {pollPairAmount !== pairs.length ?
        <h5 className='edit-poll__title'>Add a new pair to the vote</h5>
        :
        <h5 className='edit-poll__title'>Max pairs reached</h5>
      }
      {pollPairAmount !== pairs.length && (
        <NewPair
          onClick={sendNewPair}
          setLeader={value => setLeader(value)}
          setFollower={value => setFollower(value)}
        />
      )}
      
      {pairs.map((pair, index) => (
        <PairCard
        id={index}
        key={index}
        leader={pair.leader}
        follower={pair.follower}
      />
      ))}
    </div>
  )
}

EditPoll.propTypes = {
  pollName: PropTypes.string,
}

export default EditPoll;