const profileInfo = document.querySelector('.profile-info');
const editProfileButton = profileInfo.querySelector('.profile-info__edit-button');
const addCardButton = profileInfo.querySelector('.profile-info__add-button');
const profileName = profileInfo.querySelector('.profile-info__name');
const profileAbout = profileInfo.querySelector('.profile-info__about');

const formProfileElement = document.querySelector('.form_target_profile');
const inputProfileName = formProfileElement.querySelector('.form__text_position_top');
const inputProfileAbout = formProfileElement.querySelector('.form__text_position_bottom');

const formCardsElement = document.querySelector('.form_target_cards');
const inputCardsName = formCardsElement.querySelector('.form__text_position_top');
const inputCardsLink = formCardsElement.querySelector('.form__text_position_bottom');

const popupProfile = document.querySelector('.popup_target_edit-profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileBody = popupProfile.querySelector('.popup__body');

const popupCards = document.querySelector('.popup_target_add-card');
const cardsCloseButton = popupCards.querySelector('.popup__close-button');

const popupCardFullscreen = document.querySelector('.popup_target_card-fullscreen');
const fullscreenCloseButton = popupCardFullscreen.querySelector('.popup__close-button');
const figureImage = popupCardFullscreen.querySelector('.figure__img');
const figureName = popupCardFullscreen.querySelector('.figure__name');

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


/** 
 * @description Создание нового DOM элемента (Карточка).
 * @param {string} cardLink - Ссылка на изображение
 * @param {string} cardName - Название изображения
 * @returns {object} - Элемент DOM
 */
const createCard = (cardLink, cardName) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = cardLink;
  cardElement.querySelector('.card__img').alt = cardName;
  cardElement.querySelector('.card__place-name').textContent = cardName;
  return cardElement
}



/** 
 * @description Открытие попап, добавление текстовых значений полей элементов profileName/profileAbout  
 * в свойства value элементов inputName/inputAbout
 */
const popupProfileOpen = () => {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  popupProfile.classList.add('popup_opend');
  // popupProfileBody.classList.add('popup__body_opened');
}

/** 
 * @description Закрытие попап
 */
const popupClose = (popupName) => popupName.classList.remove('popup_opend');

/** 
 * @description Запись значений полей в форму formProfileSubmit, закрытие попапа popupProfile
 * @param {object} e - Событие
*/
const formProfileSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  popupClose(popupProfile)
}

/** 
 * @description Запись значений полей в форму formCardsSubmit, закрытие попапа popupCards
 * @param {object} e - Событие
*/
const formCardsSubmit = (e) => {
  e.preventDefault();
  const newCard = createCard(inputCardsLink.value, inputCardsName.value);
  cardsElement.prepend(newCard);
  popupClose(popupCards);
}

const popupFullscreenOpen = (e) => {
    figureImage.src = e.target.src;
    figureName.textContent = e.target.alt
    popupCardFullscreen.classList.add('popup_opend');
}

/** 
 * @description Удаление элемента карточки с классом '.card' при нажатии на кнопку с классом  'card__garbage'
 * @param {object} e - Событие
*/
const cardRemove = (e) => {
    let parentElem = e.target.closest('.card')
    parentElem.remove()
}

initialCards.forEach(elem => cardsElement.append(createCard(elem.link, elem.name)))


editProfileButton.addEventListener('click', popupProfileOpen)
profileCloseButton.addEventListener('click', () => popupClose(popupProfile))

addCardButton.addEventListener('click', () => popupCards.classList.add('popup_opend'));
cardsCloseButton.addEventListener('click', () => popupClose(popupCards))

formProfileElement.addEventListener('submit', formProfileSubmit);

formCardsElement.addEventListener('submit', formCardsSubmit);

cardsElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__garbage')) {cardRemove(e)}
  if (e.target.classList.contains('card__img')) {popupFullscreenOpen(e)}
  if (e.target.classList.contains('card__logo-heart')) {
    e.target.classList.toggle('card__logo-heart_style_filled')
  }
})

fullscreenCloseButton.addEventListener('click', () => popupClose(popupCardFullscreen))




















