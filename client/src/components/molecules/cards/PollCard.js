import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {ReactComponent as Edit} from "../../../images/icons/edit-card.svg";
import Card from './Card';
import Button from '../../atoms/button/Button';
import Publish from '../modals/Publish';
import { restApi } from '../../../restApi';

const PollCard = ({name, id, accessCode}) => {
  const navigate = useNavigate();
  const [publishOpen, setPublishOpen] = useState(false);

  const handleOpenPublish = async () => {
    setPublishOpen(!publishOpen);
  }

  const handlePublish = async () => {
    const res = await restApi.setPublishByPollId({id: id});
    if(res.rowCount) {
      navigate('history');
    }
  }
  
  return (
    <Card className="poll-card">
      <div className='poll-card__header'>
        <h3 className='poll-card__title' >{name}</h3>
        <Button
          onClick={() => navigate(`new-poll?poll=${id}&name=${name}`)}
          className='button button--icon poll-card__edit'
        >
          <Edit className='poll-card__icon' />
        </Button>
      </div>
      <Button
        onClick={() => navigate(`access-code?code=${accessCode}`)}
        className='button poll-card__access-code'
      >
        Access code
      </Button>
      <Button onClick={handleOpenPublish} className='button button--secondary poll-card__publish' >Publish Results</Button>
      
      {publishOpen && <Publish handleClose={handleOpenPublish} publish={handlePublish} />}
    </Card>
  );
}

PollCard.propTypes = {
  name: PropTypes.string,
  accessCode: PropTypes.string,
  handlePublish: PropTypes.func,
}

export default PollCard;