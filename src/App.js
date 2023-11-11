import React, { useState } from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import NavBar from "./components/NavBar/NavBar";
import {BasketPage} from './pages';
import MainNavigation from './navigation/MainNavigation';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState('register');

  const changePage = (page) => {
    setCurrentPage(page);
  }

  const toggleLogin = (type) => {
    setIsLoginOpen(!isLoginOpen);
    setLoginType(type);
  }

  return (
    <div>
      {isLoginOpen ? (
        <LoginPage formType={loginType} previousPage={currentPage} />
      ) : (
        <div>
          <NavBar changePage={changePage} toggleLogin={toggleLogin} />
          {/* {currentPage === 'login' && <LoginPage formType='login' />}
          {currentPage === 'main' && <MainPage changePage={changePage} toggleLogin={toggleLogin} />}
          {currentPage === 'menu' && <MenuPage changePage={changePage} toggleLogin={toggleLogin} />}
          {currentPage === 'basket' && <BasketPage changePage={changePage} toggleLogin={toggleLogin} />} */}
          <MainNavigation />
        </div>
      )}
    </div>
  );
}

export default App;