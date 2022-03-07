import React from 'react';
import PropTypes from 'prop-types';

const Form = ({children, submit, className}) => {
  return (
    <form className={className} noValidate onSubmit={submit} >
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  submit: PropTypes.func,
  className: PropTypes.string,
}

export default Form;