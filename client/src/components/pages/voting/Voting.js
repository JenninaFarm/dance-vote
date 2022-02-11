import React from 'react';
import PropTypes from 'prop-types';

const Voting = ({pollCode}) => {
  return (
    <div>
      <h1>Voting</h1>
    </div>
  );
}

Voting.propTypes = {
  pollCode: PropTypes.string,
}

export default Voting;