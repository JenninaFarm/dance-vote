import React from 'react';
import {ReactComponent as Home} from "../../../images/icons/home.svg";
import {ReactComponent as Plus} from "../../../images/icons/plus.svg";
import {ReactComponent as History} from "../../../images/icons/history.svg";
import Button from '../../atoms/button/Button';


const NavigationBar = () => {
  return (
    <nav className='navigation' >
      <Button className='button button--icon' >
        <Home className='navigation__icon' />
      </Button>
      <Button className='button button--icon' >
        <Plus className='navigation__icon' />
      </Button>
      <Button className='button button--icon' >
        <History className='navigation__icon' />
      </Button>
    </nav>
  );
}

NavigationBar.propTypes = {

}

export default NavigationBar;