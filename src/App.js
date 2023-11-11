import React, { useState } from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import NavBar from "./components/NavBar/NavBar";
import {BasketPage} from './pages';
import MainNavigation from './navigation/MainNavigation';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState('register');

  const toggleLogin = (type) => {
    setIsLoginOpen(!isLoginOpen);
    setLoginType(type);
  }

  return (
    <div>
      <NavBar toggleLogin={toggleLogin} />
      <MainNavigation />
    </div>
  );
}

export default App;