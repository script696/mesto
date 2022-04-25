/** Элементы DOM profile */
const editProfileButton = document.querySelector('.profile-info__edit-button');
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__about');
/** Элементы DOM form */
const formElement = document.querySelector('.form');
const inputName = formElement.querySelector('.form__text_type_name');
const inputAbout = formElement.querySelector('.form__text_type_about');
/** Элементы DOM popup */
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');


/** 
 * @description Открытие попапа. Запись в поля формы дефолтных значений
*/
const popupOpen = () => {
  inputName.value = `${profileName.textContent}`;
  inputAbout.value = `${profileAbout.textContent}`;
  popup.classList.toggle('popup_opend');
}

/** 
 * @description Закрытие попапа
*/
const popupClose = () => {
  popup.classList.toggle('popup_opend');
}

/** 
 * @description Запись значений полей в форму, закрытие попапа
*/
const formSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupClose()
}

/** Слушатели открытия/закрытия попапа */
editProfileButton.addEventListener('click', popupOpen);
closePopupButton.addEventListener('click', popupClose);

/** Слушатели формы */
formElement.addEventListener('submit', formSubmit);



















