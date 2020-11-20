import { getLocalStorage, setLocalStorage } from "./storage.js";


const userData =  {
  wishListData: getLocalStorage('wishlist'),

  // Получаем карточки

  get wishList() {
    return this.wishListData; // возвращаем wishList
  },

  // Записываем карточку в wishList,(передаем id)

  set wishList(id) {
    if (this.wishListData.includes(id)) {
      const index = this.wishListData.indexOf(id); // получаем индекс
      this.wishListData.splice(index, 1); // удаляем id карточки
    } else {
      this.wishListData.push(id); // записываем карточку в wishList
    }
    setLocalStorage('wishlist', this.wishList);
  },


  cartListData: getLocalStorage('cartlist'),

  // Получаем карточки

  get cartList() {
    return this.cartListData;
  },

  set cartList(id) {
    let obj = this.cartListData.find(item => item.id === id); // если нашли obj в 'cartLidstData', значит сравниваем с id
    if (obj) {
      obj.count++; // увеличиваем количество товара
    } else { // если не нашли, создаем обьект
      obj = {
        id: id,
        count: 1, // первый элемент
      };
      this.cartListData.push(obj); //пушим в карт лист, если он первый
    }
    setLocalStorage('cartlist', this.cartList);
  },

  // Изменяем количество товаров в корзине

  set changeCountCartList(itemCart) {
    let obj = this.cartListData.find(item => item.id === itemCart.id); // достаем объект по id и сравниваем его с добавленным id
    obj.count = parseInt(itemCart.count); // меняем count

    setLocalStorage('cartlist', this.cartList); // записал в local storage
  },

  // Удаляем товар

  set deleteItemCart(idd) {
    let index = -1; // - чтобы, если не найдём случайно не удалить имеющийся элемент
    this.cartList.indexOf((item, i) => { // (элемент, индекс) находим элемент в объкте
      if (item.id === idd) { //
        index = i;
      }
    });
    this.cartList.splice(index, 1);
    setLocalStorage('cartlist', this.cartList);
  }


};

export default userData;
