import React from 'react';
import Card from './Card';
import PropType from 'prop-types';

const PairCard = ({id, leader, follower}) => {
  return (
    <Card className='pair-card'>
      <p>{id + 1}</p>
      <div className='pair-card__pair'>
        <p className='pair-card__lead'>{leader}</p>
        <p className='pair-card__follow'>{follower}</p>
      </div>
    </Card>
  );
}

PairCard.propTypes = {
  leader: PropType.string,
  follower: PropType.string,
}

export default PairCard;