import { getData } from "./getData.js";
import userData from "./userData.js";

const NEW_COUNTER_ITEM = 6; // Новинка или нет в наличии

const generateItemPage = () => {

  const renderCard = ({category, subcategory, name: itemName, count, description, id, img, price}) => {  // деструктуризация (все свойства объкта(json) сохранням в переменную)

    const breadcrumbLink = document.querySelectorAll('.breadcrumb__link');
    const goodImages = document.querySelector('.good-images');
    const goodItemNew = document.querySelector('.good-item__new');
    const goodItemHeader = document.querySelector('.good-item__header');
    const goodItemDescription = document.querySelector('.good-item__description');
    const goodItemEmpty = document.querySelector('.good-item__empty');
    const goodItemPriceValue = document.querySelector('.good-item__price-value');
    const btnGood = document.querySelector('.btn-good');
    const btnAddWishlist = document.querySelector('.btn-add-wishlist');

    // Делаем 'Хлебные крошки'

    console.log(breadcrumbLink)

    breadcrumbLink[0].textContent = category;
    breadcrumbLink[0].href = `goods.html?cat=${category}`;
    breadcrumbLink[1].textContent = subcategory;
    breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;
    breadcrumbLink[2].textContent = itemName;

    // Добавляем все значения товара

    goodImages.textContent = '';
    goodItemHeader.textContent = itemName;
    goodItemDescription.textContent = description;
    goodItemPriceValue.textContent = price;
    btnGood.dataset.idd = id; // добавляем к кнопка data-idd = 'id'
    btnAddWishlist.dataset.idd = id;

    // Добавляем картинки

    img.forEach(item => {
      goodImages.insertAdjacentHTML('afterbegin', `
      <div class="good-image__item">
        <img src="${item}" alt="${itemName} - ${description}">
      </div>
      `)
    })

    if (count >= NEW_COUNTER_ITEM) { // если товаров больше 6 - это 'Новинка'
      goodItemNew.style.display = 'block';
      goodItemNew.style.color = 'red';
    } else if (!count) { // если товаров 0 - это 'Нет в наличии'
      goodItemEmpty.style.display = 'block';
      btnGood.style.display = 'none';
    }

    // Добавляем или удаляем id в wishlist после нажатия кнопки

    const checkWishList = () => {
      //получаем данные(срабатывает get)
      if (userData.wishList.includes(id)) {
        btnAddWishlist.classList.add('contains-wishlist');
      } else {
        btnAddWishlist.classList.remove('contains-wishlist');
      }
    };

    btnAddWishlist.addEventListener('click', () => {
      // присваем set аргумент id,
      userData.wishList = id;
      checkWishList();
    });

    checkWishList();

    // Записываем id в корзину

    btnGood.addEventListener('click', ()=> {
      userData.cartList = id;
    })

  };


  if(location.hash && location.pathname.includes('card')) { // Проверяем есть ли у location('card', '#')
    getData.item(location.hash.substring(1), renderCard);// 1 параметр - берем 'location.hash(#id..)' и убираем #. 2 параметр - отрисовуем страничку с товаром
  }
};

export default generateItemPage;