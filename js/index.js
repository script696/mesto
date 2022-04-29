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
 * @description Открытие попап, добавление текстовых значений полей элементов profileName/profileAbout  
 * в свойства value элементов inputName/inputAbout
 */
const popupOpen = () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opend');
}

/** 
 * @description Закрытие попап
 */
 const popupClose = () => popup.classList.remove('popup_opend');

/** 
 * @description Запись значений полей в форму, закрытие попапа
 * @param {object} e - Событие
*/
const formSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupClose()
}

/** 
 * @description Слушатель кнопки editProfileButton - открытие попапа 
 */
editProfileButton.addEventListener('click', popupOpen);

/** 
 * @description Слушатель кнопки closePopupButton - закрытие попапа 
 */
closePopupButton.addEventListener('click', popupClose);

/**  
 * @description Слушатели формы formElement 
*/
formElement.addEventListener('submit', formSubmit);



















