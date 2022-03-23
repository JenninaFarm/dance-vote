import React from 'react';
import Card from './Card';
import PropType from 'prop-types';

const PairCardResult = ({id, leader, follower}) => {
  return (
    <Card className='pair-card'>
      <p className='pair-card__placement'>{id + 1}</p>
      <div className='pair-card__pair'>
        <p className='pair-card__lead--result'>{leader}</p>
        <p className='pair-card__follow--result'>{follower}</p>
      </div>
    </Card>
  );
}

PairCardResult.propTypes = {
  leader: PropType.string,
  follower: PropType.string,
  id: PropType.number,
}

export default PairCardResult;