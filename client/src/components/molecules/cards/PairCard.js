import React from 'react';
import Card from './Card';
import PropType from 'prop-types';

import {ReactComponent as Crown1} from "../../../images/icons/crown1.svg";
import {ReactComponent as Crown2} from "../../../images/icons/crown2.svg";
import {ReactComponent as Crown3} from "../../../images/icons/crown3.svg";

const PairCard = ({id, leader, follower}) => {
  return (
    <Card className='pair-card'>
      {(id + 1 === 1 || id + 1 === 2 || id + 1 === 3) ?
        <div className='pair-card__crown'>
          {id + 1 === 1 && <Crown1 />}
          {id + 1 === 2 && <Crown2 />}
          {id + 1 === 3 && <Crown3 />}
        </div>
        :
        <p className='pair-card__placement'>{id + 1}</p>
      }
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