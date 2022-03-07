import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({children}) => {
  return (
    <div className='modal'>
      <div className='modal__content'>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
}

export default Modal;