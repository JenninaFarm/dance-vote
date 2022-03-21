import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../atoms/input/Input';
import Label from '../../../atoms/label/Label';
import Button from '../../../atoms/button/Button';

const NewPair = ({onClick, follower, leader, setLeader, setFollower}) => {

  return (
    <div className='new-pair'>
      <Label inputId='leader' content='Leader' />
      <Input className='new-pair__input' id='leader' placeholder='Leader name' value={leader} handleValueChange={value => setLeader(value)} />
      <Label inputId='follower' content='Follower' />
      <Input className='new-pair__input' id='follower' value={follower} placeholder='Follower name' handleValueChange={value => setFollower(value)} />
      <Button className='button new-pair__button'  onClick={onClick} > 
        Add pair
      </Button>
    </div>
  );
}

NewPair.propTypes = {
  onClick: PropTypes.func,
  setLeader: PropTypes.func,
  setFollower: PropTypes.func,
  follower: PropTypes.string,
  leader: PropTypes.string,
}

export default NewPair;