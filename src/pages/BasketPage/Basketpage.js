import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./basketpage.css";

const BasketPage = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7000/api/meal")
      .then((response) => response.json())
      .then((data) => setMenuItems(data.sort((a, b) => (a.id > b.id ? 1 : -1))))
      .catch((error) => console.error("Ошибка при получении меню:", error));
    fetch("http://localhost:7000/api/user/getBaskets")
      .then((response) => response.json())
      .then((data) => setBasketItems(data))
      .catch((error) => console.error("Ошибка при получении заказов:", error));
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    alert(
      `Уважаемый ${JSON.stringify(
        data.firstName
      )}!Ваш заказ принят и обрабатывается, в ближайшее время с Вами свяжутся. Спасибо что Вы с нами!`
    );
    document.location.reload();
  };

  return (
    <div className="basket-page-container">
      <div className="basket-content">
        <h2>Ваша корзина</h2>
        {basketItems.map((item) => (
          <li key={item.id}>
            <img
              src={`http://localhost:7000/static/${
                menuItems[item.mealId - 1].img
              }`}
              alt={menuItems[item.mealId - 1].name}
            />
            <div>
              <h3>{menuItems[item.mealId - 1].name}</h3>
              <p>{menuItems[item.mealId - 1].description}</p>
              <p className="price">Цена: ${menuItems[item.mealId - 1].price}</p>
            </div>
          </li>
        ))}
        {basketItems.length === 0 ? (
          <></>
        ) : (
          <div className="navbar-button-container">
            <button
              className="btn-1"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              Оформить заказ
            </button>
          </div>
        )}
        {showForm && (
          <div className="modal-container">
            <div
              className="full-item__close-btn"
              onClick={() => {
                setShowForm(!showForm);
              }}
            />
            <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-form__container">
                <label className="modal-form__label">Имя:</label>
                <input
                  className="modal-form__input"
                  {...register("firstName", {
                    required: "Поле обязательно к заполнению!",
                    minLength: {
                      value: 3,
                      message: "Минимум 3 символа!",
                    },
                    maxLength: {
                      value: 15,
                      message: "Максимум 15 символа!",
                    },
                  })}
                />
                <div>
                  {errors?.firstName && (
                    <p className="modal-form__error">
                      {errors?.firstName.message || "Error!"}
                    </p>
                  )}
                </div>
                <label className="modal-form__label">Фамилия:</label>
                <input
                  className="modal-form__input"
                  {...register("lastName", {
                    required: "Поле обязательно к заполнению!",
                    minLength: {
                      value: 3,
                      message: "Минимум 3 символа!",
                    },
                    maxLength: {
                      value: 15,
                      message: "Максимум 15 символа!",
                    },
                  })}
                />
                <div>
                  {errors?.lastName && (
                    <p className="modal-form__error">
                      {errors?.lastName.message || "Error!"}
                    </p>
                  )}
                </div>
                <label className="modal-form__label">Электронная почта:</label>
                <input
                  className="modal-form__input"
                  {...register("mail", {
                    required: "Поле обязательно к заполнению!",
                    pattern: {
                      value:
                        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                      message: "Введенный имейл не существует!",
                    },
                  })}
                />
                <div>
                  {errors.mail && (
                    <p className="modal-form__error">{errors.mail.message}</p>
                  )}
                </div>
                <input
                  className="modal-form__input modal-form__btn"
                  type="submit"
                  disabled={!isValid}
                  value="Заказать"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
