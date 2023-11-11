import React from 'react';
import './NavBar.css';
import useScrollPosition from "../../hooks/useScrollPosition";
import mainLogo from '../../assets/newlogo10.png';
import { Link, useNavigate } from 'react-router-dom';
import PATHS from '../../constants/paths';

const NavBar = ({ changePage, toggleLogin }) => {
  const navigate = useNavigate();
  const scrollPosition = useScrollPosition();

  return (
    <div className={scrollPosition > 0 ? 'navbar-container-scrolled' : 'navbar-container'}>
      <img className='navbar-logo' src={mainLogo} alt="logo" />
      <div className='navbar-menu-container'>
        <ul className='navbar-menu-list'>
          <li>
            <Link to={PATHS.home}>HOME</Link>
          </li>
          <li>
            <Link to={PATHS.menu}>MENU</Link>
          </li>
          <li>
            <Link to={PATHS.basket}>BASKET</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-button-container'>
        <button className='btn-1' onClick={() => navigate(PATHS.signUp)}>Sign Up</button>
        <button className='btn-1' onClick={() => navigate(PATHS.signIn)}>Sign In</button>
      </div>
    </div>
  );
};

export default NavBar;