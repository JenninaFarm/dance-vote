import React from 'react';
import PropTypes from 'prop-types';

const Form = ({children, submit}) => {
  return (
    <form noValidate onSubmit={submit} >
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  submit: PropTypes.func,
}

export default Form;