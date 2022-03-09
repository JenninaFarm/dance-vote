import React from 'react';
import {ReactComponent as Home} from "../../../images/icons/home.svg";
import {ReactComponent as Plus} from "../../../images/icons/plus.svg";
import {ReactComponent as History} from "../../../images/icons/history.svg";


const NavigationBar = () => {
  return (
    <nav className='navigation' >
      <Home className='navigation__icon' />
      <Plus className='navigation__icon' />
      <History className='navigation__icon' />
    </nav>
  );
}

NavigationBar.propTypes = {

}

export default NavigationBar;