import React from 'react';
import './navbar.css';
import useScrollPosition from "../../hooks/useScrollPosition";
import mainLogo from '../../assets/newlogo10.png';

const NavBar = ({ changePage, toggleLogin }) => {
  const scrollPosition = useScrollPosition();

  const handleMenuClick = (page) => {
    changePage(page);
  };

  return (
    <div className={scrollPosition > 0 ? 'navbar-container-scrolled' : 'navbar-container'}>
      <img className='navbar-logo' src={mainLogo} alt="logo" />
      <div className='navbar-menu-container'>
        <ul className='navbar-menu-list'>
          <li onClick={() => handleMenuClick('main')}>HOME</li>
          <li onClick={() => handleMenuClick('menu')}>MENU</li>
          <li onClick={() => handleMenuClick('basket')}>BASKET</li>
        </ul>
      </div>
      <div className='navbar-button-container'>
        <button className='btn-1' onClick={() => toggleLogin('register')}>Sign Up</button>
        <button className='btn-1' onClick={() => toggleLogin('login')}>Sign In</button>
      </div>
    </div>
  );
};

export default NavBar;