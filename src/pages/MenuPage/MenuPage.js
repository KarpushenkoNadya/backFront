import React, { useEffect, useState } from 'react';
import './menupage.css';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/meal')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Ошибка при получении меню:', error));
  }, []);

  const handleOrderClick = (mealId) => {
    // Здесь вы можете добавить логику для обработки заказа
    console.log(`Заказать блюдо с ID ${mealId}`);
  };

  return (
    <div className='menu-page-container'>
      <div className='menu-container'>
        <h2>Меню</h2>
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <img src={`путь/к/изображениям/${item.img}`} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className='price'>Цена: ${item.price}</p>
                <button className='btn-1' onClick={() => handleOrderClick(item.id)}>Заказать</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuPage;