import React from 'react';

const Button = (props) => {
  return (
    <button className={`button button--${props.modifier}`} {...props}>
      {props.children}
    </button>
  );
}

export default Button;