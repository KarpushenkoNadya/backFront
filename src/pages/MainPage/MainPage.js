import React from "react";
import { Link } from "react-router-dom"; // Импортируйте Link из react-router-dom
import "./mainpage.css";
import dayMeal from "../../assets/daymeal.JPG";
import PATHS from "../../constants/paths";

const MainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-meal-card">
        <img className="day-meal-img" src={dayMeal} alt="" />
        <div className="day-meal-description-container">
          <h2>MEAL OF THE DAY!</h2>
          <span className="day-meal-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
            culpa delectus eius eos eum eveniet, facere facilis labore quis
            reiciendis soluta ullam? Aut facilis fugit odio voluptas. Atque aut
            delectus dignissimos eveniet explicabo laboriosam mollitia nam nisi
            placeat porro quidem quisquam, sed similique sit suscipit temporibus
            ut vel veniam! Quia!
          </span>
        </div>
      </div>
      <Link to={PATHS.menu}>
        {" "}
        {/* Используйте Link вместо обычной кнопки */}
        <button className="btn-1 try-btn">TRY NOW</button>
      </Link>
    </div>
  );
};

export default MainPage;
