import initialCards from './initialCards.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileInfo = document.querySelector('.profile-info');
const editProfileButton = profileInfo.querySelector('.profile-info__edit-button');
const addCardButton = profileInfo.querySelector('.profile-info__add-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileAbout = profileInfo.querySelector('.profile-info__about');

const formProfileElement = document.querySelector('.form_target_profile');
const inputProfileName = formProfileElement.querySelector('.form__text_position_top');
const inputProfileAbout = formProfileElement.querySelector('.form__text_position_bottom');

const formAddCardElement = document.querySelector('.form_target_cards');
const inputCardName = formAddCardElement.querySelector('.form__text_position_top');
const inputCardLink = formAddCardElement.querySelector('.form__text_position_bottom');

const popupProfile = document.querySelector('.popup_target_edit-profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');

const popupAddCard = document.querySelector('.popup_target_add-card');
const cardCloseButton = popupAddCard.querySelector('.popup__close-button');

const popupCardFullscreen = document.querySelector('.popup_target_card-fullscreen');
const fullscreenCloseButton = popupCardFullscreen.querySelector('.popup__close-button');
const figureImage = popupCardFullscreen.querySelector('.figure__img');
const figureName = popupCardFullscreen.querySelector('.figure__name');
const cardsContainer = document.querySelector('.cards');

const options = {
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}


/** 
 * @description Закрытие попапа при нажатии кнопки escape
 * @param {object} - событие
 */
const closeEscapeHandler = (e) => {
  if (e.key === 'Escape') {
    const poupCurrentOpenedElem = document.querySelector('.popup_opend')
    closePopup(poupCurrentOpenedElem);
  }
}


/** 
 * @description Открытие попапа
 * @param {object} - Элемент DOM
 */
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opend')

  document.addEventListener('keydown', closeEscapeHandler)
}


/** 
 * @description Закрытие попапа
 * @param {object} - Элемент DOM
 */
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opend')
  document.removeEventListener('keydown', closeEscapeHandler)
};

/** 
 * @description Открытие попап, добавление текстовых значений полей элементов profileName/profileAbout  
 * в свойства value элементов inputName/inputAbout
 */
const openPopupProfile = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
}

/** 
 * @description Запись значений полей в форму handleProfileFormSubmit, закрытие попапа popupProfile
 * @param {object} e - Событие
*/
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closePopup(popupProfile)
}



/** 
 * @description Создает экземпляр класса Card
 * @param {object} nameLinkData - Объект с именем карточки и ссылкой
 * @param {string} templateName - Шаблон карточки
 * @param {object} fooData - Объект с функциями
 * @return {object} - DOM элемент с карточкой
 * 
*/
const createCard = (nameLinkData, templateName, fooData) => {
  const card = new Card(nameLinkData, templateName, fooData)

  return card.generateCard();
}


/** 
 * @description Запись значений полей в форму handleAddCardFormSubmit, закрытие попапа popupAddCard
 * @param {object}  - Событие
*/
const handleAddCardFormSubmit = (e) => {
  e.preventDefault();

  const cardElement = createCard(
    {
      name: inputCardName.value,
      link: inputCardLink.value
    },
    '.card-template',
    {
      openPopup,
      figureImage,
      figureName,
      popupCardFullscreen
    },
  )

  cardsContainer.prepend(cardElement)

  formAddCardElement.reset();

  formAddCardValidation.toggleButtonState()

  closePopup(popupAddCard);

}


initialCards.forEach(val => {
  const cardElement = createCard(val, '.card-template', { openPopup, figureImage, figureName, popupCardFullscreen });

  cardsContainer.append(cardElement)
})


const formProfileValidation =  new FormValidator(options, formProfileElement);
formProfileValidation.enableValidation();

const formAddCardValidation = new FormValidator(options, formAddCardElement);
formAddCardValidation.enableValidation();


editProfileButton.addEventListener('click', openPopupProfile)
profileCloseButton.addEventListener('click', () => closePopup(popupProfile))

addCardButton.addEventListener('click', () => openPopup(popupAddCard));
cardCloseButton.addEventListener('click', () => closePopup(popupAddCard))

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);

fullscreenCloseButton.addEventListener('click', () => closePopup(popupCardFullscreen))

document.addEventListener('mousedown', (e) => {
  if (e.target.matches('.popup')) {
    closePopup(e.target)
  }
})




















