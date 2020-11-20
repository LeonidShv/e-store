// Получаем данные localStorage

export const getLocalStorage = key => {
  return localStorage.getItem(key) ? // если получили данные
    JSON.parse(localStorage.getItem(key)) : // возвращаем значения
    []; // если ничего не получили возращаем пустой массив
};

// Записываем данные в localStorage

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};