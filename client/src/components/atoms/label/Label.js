import React from 'react';
import PropTypes from 'prop-types';

const Label = ({inputId, content, ...rest}) => {
  return (
    <label htmlFor={inputId} {...rest}>
      {content}
    </label>
  );
}

Label.propTypes = {
  inputId: PropTypes.string,
  content: PropTypes.string,
}

export default Label;