import { getData }  from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

//MENU
//open//close menu

export const catalog = () => {
  const updataSubCatalog = generateSubCatalog();
  const btnBurger = document.querySelector('.btn-burger');
  const catalog = document.querySelector('.catalog');
  const subCatalog = document.querySelector('.subcatalog');
  const subcatalogHeader = document.querySelector('.subcatalog-header');
  const overlay = document.createElement('div');

  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay);

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  }

  const closeMenu = () => {
    closeSubMenu();
    catalog.classList.remove('open');
    overlay.classList.remove('active');
  }

  const openSubMenu = (event) => {
    event.preventDefault();//не переходить на новую страницу
    const target = event.target; // где был клик?
    const itemList = target.closest('.catalog-list__item');//при клике подымаюсь на верх к родительскому li

    if(itemList) {
      getData.subCatalog(target.textContent, (data) => {// 1параметр - где был клик в каталоге(смотрим название). 2параметр - callback функция
        updataSubCatalog(target.textContent, data);//отрисовуем сабкаталог
        subCatalog.classList.add('subopen');
      })
    }

    if (target.closest('.btn-close')) {
      closeMenu();
    }

  };

  const closeSubMenu = () => {
    subCatalog.classList.remove('subopen');
  }

  btnBurger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click', openSubMenu);
  subCatalog.addEventListener('click', () => {
    const btnReturn = event.target.closest('.btn-return'); //если попали на кнопку закрытия саб-каталога
    if (btnReturn) {
      closeSubMenu();//закрываем саб-каталог
    }
  });
}