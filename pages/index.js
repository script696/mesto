import initialCards from '../components/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
  addCardButton,
  formProfileElement,
  formAddCardElement,
  figureImage,
  figureName,
  cardsContainerSelector,
} from '../utils/constants.js';
import './index.css';



const options = {
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}


/** 
 * @description Создает экземпляр класса Card
 * @param {object} nameLinkData - Объект с именем карточки и ссылкой
 * @param {string} templateName - Шаблон карточки
 * @param {object} fooData - Объект с функциями
 * @return {object} - DOM элемент с карточкой
 * 
*/
const createCard = (nameLinkData, templateName, fooData, popupWithImgObj, popupMethodOpen) => {
  const card = new Card(nameLinkData, templateName, fooData, popupWithImgObj, popupMethodOpen)

  return card.generateCard();
}

/** 
 * @description Вызывается в момент сабмита формы редактирования профиля,
 * получает данные из формы, введенные пользователем,
 * получает текущие значения полей профиля методом getUserInfo,
 * записывает данные из формы в поля профиля методом setUserInfo
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleProfileFormSubmit = (inputData) => {
  const userInfoData = userInfo.getUserInfo();
  userInfo.setUserInfo(userInfoData, inputData)

}

/** 
 * @description Вызывается в момент сабмита формы добавления карточки,
 * получает данные из формы, введенные пользователем,
 * создает экземпляр класса Section,
 * вызывает метод rendererItems, добавляя новую карточку
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleAddCardFormSubmit = (inputData) => {
  const newCard = {
    name: inputData.inputTopVal.value,
    link: inputData.inputBottomVal.value,
  }

  const newCardItem = new Section({
    items: [newCard],
    renderer: (item) => {
      const cardElement = createCard(item, '.card-template', { figureImage, figureName}, popupWithImgObj.open);

      initialCardList.prependItem(cardElement)
    }
  },
    cardsContainerSelector
  )

  newCardItem.rendererItems()
}


const formProfileValidation = new FormValidator(options, formProfileElement);
formProfileValidation.enableValidation();
const formAddCardValidation = new FormValidator(options, formAddCardElement);
formAddCardValidation.enableValidation();

const popupWithImgObj = new PopupWithImage('.popup_target_card-fullscreen')
popupWithImgObj.setEventListeners()
const popupEditProfile = new PopupWithForm('.popup_target_edit-profile', handleProfileFormSubmit)
popupEditProfile.setEventListeners()
const popupAddCard = new PopupWithForm('.popup_target_add-card', handleAddCardFormSubmit);
popupAddCard.setEventListeners()


const userInfo = new UserInfo('.profile-info__name', '.profile-info__about');

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, '.card-template', { figureImage, figureName}, popupWithImgObj.open);

    initialCardList.addItem(cardElement)
  }
},
  cardsContainerSelector
)

editProfileButton.addEventListener('click', () => {
  popupEditProfile.open()
})

addCardButton.addEventListener('click', () => {
  popupAddCard.open()
});

initialCardList.rendererItems()

