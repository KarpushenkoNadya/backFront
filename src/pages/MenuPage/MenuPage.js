import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./menupage.css";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentMenuItems, setCurrentMenuItems] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/meal")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.sort((a, b) => (a.id > b.id ? 1 : -1)));
        setCurrentMenuItems(data.sort((a, b) => (a.id > b.id ? 1 : -1)));
      })
      .catch((error) => console.error("Ошибка при получении меню:", error));
    fetch("http://localhost:7000/api/type/types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
      })
      .catch((error) => console.error("Ошибка при получении типов:", error));
  }, []);

  const handleOrderClick = (mealId) => {
    toast.success("Товар добавлен в корзину!");
    fetch("http://localhost:7000/api/user/addMeal", {
      method: "POST",
      body: JSON.stringify({
        basketId: 1,
        mealId: mealId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
  };

  const getThisCategories = (props) => {
    console.log(props);
    if (props === undefined) {
      setCurrentMenuItems(menuItems);
    } else {
      setCurrentMenuItems(menuItems.filter((e) => e.typeId === props));
    }
  };

  return (
    <div className="menu-page-container">
      <div className="menu-container">
        <h2>Меню</h2>
        <div>
          <button className="btn-1" onClick={() => getThisCategories()}>
            Все
          </button>
          {types.map((item) => (
            <button
              key={item.id}
              className="btn-1"
              onClick={() => getThisCategories(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <ul>
          {currentMenuItems.map((item) => (
            <li key={item.id}>
              <img
                src={`http://localhost:7000/static/${item.img}`}
                alt={item.name}
              />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="price">Цена: ${item.price}</p>
                <button
                  className="btn-1"
                  onClick={() => handleOrderClick(item.id)}
                >
                  Заказать
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default MenuPage;
