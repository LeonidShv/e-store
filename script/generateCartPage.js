import { getData } from './getData.js';
import userData from "./userData.js";


const generateCartPage = () => {

  // Если в location после / есть 'cart'

  if(location.pathname.includes('cart')) {

    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.cart-total-price')


    const generateCartList = (data) => {

      cartList.textContent = '';

      // Если в корзине ничего нету

      if (!data.length) {
        cartList.insertAdjacentHTML('beforeend', `Список товаров пуст`);
        cartList.style.textAlign = 'center';
        cartList.style.padding = '50px 0';
        cartList.style.fontSize = '30px';
      }

      let totalPrice = 0;

      // Перебираем все карточки, которые мы получаем
      // деструктурируем (все свойства объкта сохранням в переменную)

      data.forEach(({ name: itemName, count, description, id, img: image, price }) => {

        // Создаем переменную, для количества товаров

        let options = '';

        // Достаем количество товаров(свойство: count)

        let counterUser = userData.cartList.find(item => item.id === id).count;

        // Если количество товаров которое положил user больше чем в базе данных, присваем все количество товаров

        if (counterUser > count) {
          counterUser = count;
        }

        //  Задаем option

        for (let i = 1; i <= count; i++) {
          options += `<option value=${i} ${counterUser === i ? 'selected' : ''}>${i}</option>`
        }

        // Сумма всех товаров

        totalPrice += counterUser * price;

        // Вставляем верстку

        cartList.insertAdjacentHTML('beforeend', `
        <li class="cart-item">
          <div class="product">
            <div class="product__image-container">
              <img src="${image[0]}" 
                   alt="${itemName} - ${description}">
            </div>
            <div class="product__description">
              <h3 class="product__name">
                <a href="card.html#${id}">${itemName}</a></h3>
              <p class="product_description-text">${description}</p>
            </div>
            <div class="product__prices">
              <div class="product__price-type product__price-type-regular">
                <div>
               
<!--                Если товаров больше одного, отображаем сумму, если меньше - только цену-->

                <div class="product__total product__total-regular">${price*counterUser}.-</div>
                  ${ counterUser > 1? `
                  <div class="product__price-regular">${price}.-</div>` : ``
                  }
                </div>
               </div>
            </div>
            <div class="product__controls">
  
              <div class="product-controls__remove">
                <button type="button" class="btn btn-remove" data-idd=${id}>
                  <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                </button>
              </div>
              <div class="product-controls__quantity">
                <select title="Выберите количество" aria-label="Выберите количество" data-idd="${id}">
                  ${options}
                </select>
              </div>
            </div>
          </div>
        </li>
        `)
      });

      // Записываем итоговую цену

      cartTotalPrice.textContent = totalPrice;
    }

    // Достаем данные(id товара и его количество)

    cartList.addEventListener('change', (event) => {
      userData.changeCountCartList = { // отправляем в Local Storage
        id: event.target.dataset.idd,
        count: parseInt(event.target.value)
      };
      getData.cart(userData.cartList, generateCartList);
    });

    // Удаляем карточку

    cartList.addEventListener('click', (event) => {
      const target = event.target;
      const btnRemove = target.closest('.btn-remove');
      if (btnRemove) {
        userData.deleteItemCart = btnRemove.dataset.idd; // удаляем с Local Storage
        getData.cart(userData.cartList, generateCartList);
      }
    })

    getData.cart(userData.cartList, generateCartList);
  }
};

export default generateCartPage;