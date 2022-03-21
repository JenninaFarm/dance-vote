import React from 'react';
import Card from './Card';
import PropType from 'prop-types';
import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";
import {ReactComponent as Edit} from "../../../images/icons/edit-card.svg";
import Button from '../../atoms/button/Button';
import { useNavigate } from 'react-router-dom';

const PairCardEditable = ({pairId, orderId, leader, follower}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log('handle delete');
  }

  return (
    <Card className='pair-card-editable'>
      <p>{orderId + 1}</p>
      <div className='pair-card-editable__pair'>
        <p className='pair-card-editable__lead'>{leader}</p>
        <p className='pair-card-editable__follow'>{follower}</p>
      </div>
      <Button
        onClick={handleDelete}
        className='button button--icon pair-card-editable__button-delete'
      >
        <Delete className='pair-card-editable__icon' />
      </Button>
      <Button
        onClick={() => navigate(`edit-pair?pair-id=${pairId}`)}
        className='button button--icon pair-card-editable__button-edit'
      >
        <Edit className='pair-card-editable__icon' />
      </Button>
    </Card>
  );
}

PairCardEditable.propTypes = {
  leader: PropType.string,
  follower: PropType.string,
}

export default PairCardEditable;