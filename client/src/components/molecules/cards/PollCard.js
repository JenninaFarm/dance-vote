import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Edit} from "../../../images/icons/history.svg";
import Card from './Card';
import Button from '../../atoms/button/Button';

const PollCard = ({name, accessCode, handlePublish}) => {
  return (
    <Card className="poll-card">
      <h3 className='poll-card__title' >{name}</h3>
      <Button className='button poll-card__access-code' >Access code</Button>
      <Button onClick={handlePublish} className='button button--secondary poll-card__publish' >Publish Results</Button>
      <Edit className='poll-card__edit' />
    </Card>
  );
}

PollCard.propTypes = {
  name: PropTypes.string,
  accessCode: PropTypes.string,
  handlePublish: PropTypes.func,
}

export default PollCard;