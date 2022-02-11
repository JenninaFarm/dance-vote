import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import Button from '../../atoms/button/Button';

const NewPair = ({onClick, setLeader, setFollower}) => {
  return (
    <fieldset>
      <Label inputId='leader' content='Leader' />
      <Input id='leader' placeholder='leader name' handleValueChange={event => setLeader(event.target.value)} />
      <Label inputId='follower' content='Follower' />
      <Input id='follower' placeholder='follower name' handleValueChange={event => setFollower(event.target.value)} />
      <Button onClick={onClick} > 
        Send pair
      </Button>
    </fieldset>
  );
}

NewPair.propTypes = {
  onClick: PropTypes.func,
  setLeader: PropTypes.func,
  setFollower: PropTypes.func,
}

export default NewPair;