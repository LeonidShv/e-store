import { getData } from './getData.js';
import userData from "./userData.js";

const COUNTER = 6; // Новинка или нет в наличии


const generateGoodsPage = () => {

  const mainHeader = document.querySelector('.main-header');
  const goodsList = document.querySelector('.goods-list');

  const generateCards = (data) => {
    goodsList.textContent = '';

    // Если нету товаров в wishlist или в поиске

    if (!data.length) {
      const goods = document.querySelector('.goods');
      goods.textContent = location.search === '?wishlist' ?
        'Список желаний пуст' :
        'Ничего не найдено!';
    }

    // Отрисовуем все товары

    data.forEach(item => {

      const { name: itemName, count, description, id, img: image, price } = item; // все свойства объкта сохранням в переменную

      goodsList.insertAdjacentHTML('beforeend', `        
        <li class="goods-list__item">
         <a class="goods-item__link" href="card.html#${id}">
           <article class="goods-item">
             <div class="goods-item__img">
               <img src="${image[0]}"
                 ${image[1] ? `data-second-image=${image[1]}` : '' }>
             </div>
             ${count >= COUNTER ? `<p class="goods-item__new">Новинка</p>` : ''}
             ${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}            
             <h3 class="goods-item__header">${itemName}</h3>
             <p class="goods-item__description">${description}</p>
             <p class="goods-item__price">
               <span class="goods-item__price-value">${price}</span>
               <span class="goods-item__currency"> ₴</span>
             </p>
             ${count ? `<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>` : ''}
           </article>
        </a>
        </li>
       
      `);
    });

    // Записываем id в корзину

    goodsList.addEventListener('click', event => {
      const btnAddCard = event.target.closest('.btn-add-card'); //создаем ивент на клик кнопки корзины в '/ikea/goods.html'
      if (btnAddCard) {
        event.preventDefault(); // исключаем переход на новую страницу
        userData.cartList = btnAddCard.dataset.idd;
      }
    })
  }

  // Проверяем есть ли в location(/.goods, '?')

  if(location.pathname.includes('goods') && location.search) {
    const search = decodeURI(location.search);
    const prop = search.split('=')[0].slice(1);
    const value = search.split('=')[1];

    if(prop === 's') {
      getData.search(value, generateCards);
      mainHeader.textContent = `Поиск: ${value}`;
    }else if (prop === 'wishlist') {
      getData.wishList(userData.wishList, generateCards);
      mainHeader.textContent = `Список желаемого`
    }else if (prop === 'cat' || prop === 'subcat') {
      getData.category(prop, value, generateCards);
      mainHeader.textContent = value;
    }
  }

};

export default generateGoodsPage;