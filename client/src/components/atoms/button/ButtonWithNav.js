import React from 'react';
import { NavLink } from 'react-router-dom';

const ButtonWithNav = (props) => {
  return (
    <NavLink to={props.to} >
      <button className={`button-with-nav button-with-nav--${props.modifier}`}>
        {props.children}
      </button>
    </NavLink>
  );
}

export default ButtonWithNav;