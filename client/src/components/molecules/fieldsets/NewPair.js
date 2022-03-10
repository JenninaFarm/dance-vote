import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import Button from '../../atoms/button/Button';

const NewPair = ({onClick, setLeader, setFollower}) => {
  return (
    <div>
      <Label inputId='leader' content='Leader' />
      <Input id='leader' placeholder='leader name' handleValueChange={value => setLeader(value)} />
      <Label inputId='follower' content='Follower' />
      <Input id='follower' placeholder='follower name' handleValueChange={value => setFollower(value)} />
      <Button onClick={onClick} > 
        Send pair
      </Button>
    </div>
  );
}

NewPair.propTypes = {
  onClick: PropTypes.func,
  setLeader: PropTypes.func,
  setFollower: PropTypes.func,
}

export default NewPair;