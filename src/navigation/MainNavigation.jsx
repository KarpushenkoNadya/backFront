import React from "react";
import { Route, Routes } from "react-router-dom";
import PATHS from "../constants/paths";
import MainPage from "../pages/MainPage/MainPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import BasketPage from "../pages/BasketPage/BasketPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const MainNavigation = () => {
  return (
    <Routes>
      <Route index path={PATHS.home} element={<MainPage />} />
      <Route path={PATHS.menu} element={<MenuPage />} />
      <Route path={PATHS.basket} element={<BasketPage />} />
      <Route path={PATHS.signIn} element={<SignInPage />} />
      <Route path={PATHS.signUp} element={<SignUpPage />} />
    </Routes>
  );
};

export default MainNavigation;
