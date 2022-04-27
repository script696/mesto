/** 
 * @description Элементы DOM profile 
 */
const editProfileButton = document.querySelector('.profile-info__edit-button');
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__about');

/** 
 * @description Элементы DOM form 
 */
const formElement = document.querySelector('.form');
const inputName = formElement.querySelector('.form__text_type_name');
const inputAbout = formElement.querySelector('.form__text_type_about');

/** 
 * @description Элементы DOM popup 
 */
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

/** 
 * @description Присвоение свойсву value элемента elemValue текстового поля элемента elemText
 * @param {object} elemValue - Элемент DOM
 * @param {object} elemText - Элемент DOM
*/
const setValue = (elemValue, elemText) => {
  elemValue.value = `${elemText.textContent}`;
}

/** 
 * @description Добавление/удаление класса элемента DOM
 * @param {object} elem - Элемент DOM
 * @param {string} name - Название класса
*/
const toogleClass = (elem, name) => {
  elem.classList.toggle(name);
}

/** 
 * @description Запись значений полей в форму, закрытие попапа
 * @param {object} e - Событие
*/
const formSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toogleClass(popup, 'popup_opend')
}

/** 
 * @description Слушатель кнопки editProfileButton - открытие попапа 
 */
editProfileButton.addEventListener('click', () => {
  setValue(inputName, profileName);
  setValue(inputAbout, profileAbout);
  toogleClass(popup, 'popup_opend');
});

/** 
 * @description Слушатель кнопки closePopupButton - закрытие попапа 
 */
closePopupButton.addEventListener('click', () => {
  toogleClass(popup, 'popup_opend')
});

/**  
 * @description Слушатели формы formElement 
*/
formElement.addEventListener('submit', formSubmit);



















