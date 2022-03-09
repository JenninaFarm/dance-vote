import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Home} from "../../../images/icons/home.svg";
import {ReactComponent as Plus} from "../../../images/icons/plus.svg";
import {ReactComponent as History} from "../../../images/icons/history.svg";
import Button from '../../atoms/button/Button';


const NavigationBar = ({clickPlus, clickHome, clickHistory}) => {
  return (
    <nav className='navigation' >
      <Button onClick={clickHome} className='button button--icon' >
        <Home className='navigation__icon' />
      </Button>
      <Button onClick={clickPlus} className='button button--icon' >
        <Plus className='navigation__icon' />
      </Button>
      <Button onClick={clickHistory} className='button button--icon' >
        <History className='navigation__icon' />
      </Button>
    </nav>
  );
}

NavigationBar.propTypes = {
  clickHistory: PropTypes.func,
  clickHome: PropTypes.func,
  clickPlus: PropTypes.func,
}

export default NavigationBar;