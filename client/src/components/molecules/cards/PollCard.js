import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {ReactComponent as Edit} from "../../../images/icons/edit-card.svg";
import Card from './Card';
import Button from '../../atoms/button/Button';

const PollCard = ({name, id, accessCode, handlePublish}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="poll-card">
      <h3 className='poll-card__title' >{name}</h3>
      <p> TODO: functionality to accessCode and publish</p>
      <Button
        onClick={() => navigate(`access-code?code=${accessCode}`)}
        className='button poll-card__access-code'
      >
        Access code
      </Button>
      <Button onClick={handlePublish} className='button button--secondary poll-card__publish' >Publish Results</Button>
      <Button
        onClick={() => navigate(`new-poll?poll=${id}&name=${name}`)}
        className='button button--icon poll-card__edit'
      >
        <Edit className='poll-card__icon' />
      </Button>
    </Card>
  );
}

PollCard.propTypes = {
  name: PropTypes.string,
  accessCode: PropTypes.string,
  handlePublish: PropTypes.func,
}

export default PollCard;