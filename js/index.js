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
const formAddCardButton = formAddCardElement.querySelector('.form__button');

const popupProfile = document.querySelector('.popup_target_edit-profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileBody = popupProfile.querySelector('.popup__body');

const popupAddCard = document.querySelector('.popup_target_add-card');
const cardCloseButton = popupAddCard.querySelector('.popup__close-button');

const popupCardFullscreen = document.querySelector('.popup_target_card-fullscreen');
const fullscreenCloseButton = popupCardFullscreen.querySelector('.popup__close-button');
const figureImage = popupCardFullscreen.querySelector('.figure__img');
const figureName = popupCardFullscreen.querySelector('.figure__name');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


/** 
 * @description Создание нового DOM элемента (Карточка).
 * @param {string} cardLink - Ссылка на изображение
 * @param {string} cardName - Название изображения
 * @returns {object} - Элемент DOM
 */
const createCard = (cardLink, cardName) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.addEventListener('click', openPopupFullscreen);

  const cardLikeButton = cardElement.querySelector('.card__logo-heart');
  cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('card__logo-heart_style_filled'))
  const cardDeleteButton = cardElement.querySelector('.card__garbage');

  cardDeleteButton.addEventListener('click', () => cardElement.remove())

  cardElement.querySelector('.card__img').src = cardLink;
  cardElement.querySelector('.card__img').alt = cardName;
  cardElement.querySelector('.card__place-name').textContent = cardName;
  return cardElement;
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
 * @description Запись значений полей в форму handleAddCardFormSubmit, закрытие попапа popupAddCard
 * @param {object}  - Событие
*/
const handleAddCardFormSubmit = (e) => {
  e.preventDefault();
  const newCard = createCard(inputCardLink.value, inputCardName.value);
  cardsContainer.prepend(newCard);
  formAddCardElement.reset();
  formAddCardButton.classList.add('button_inactive');
  formAddCardButton.setAttribute('disabled', true);
  closePopup(popupAddCard);
  
}

const openPopupFullscreen = (e) => {
  figureImage.src = e.target.src;
  figureImage.alt = e.target.alt;
  figureName.textContent = e.target.alt
  openPopup(popupCardFullscreen);
}


initialCards.forEach(elem => cardsContainer.append(createCard(elem.link, elem.name)))

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


















