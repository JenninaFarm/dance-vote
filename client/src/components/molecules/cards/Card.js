import React from 'react';
import PropTypes from 'prop-types';

const Card = ({content}) => {
  return (
    <div className="card">
      {content}
    </div>
  );
}

Card.propTypes = {
  content: PropTypes.string,
}

export default Card;