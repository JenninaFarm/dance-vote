import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import {ReactComponent as Delete} from "../../../images/icons/trash-l.svg";

const HistoryCard = ({id, name}) => {
  return (
    <Card className='history-card' >
      <Delete className='history-card__delete' />
      <h3 className='history-card__title'>{name}</h3>
      <p>{id}</p>
    </Card>
  );
}

HistoryCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

export default HistoryCard;