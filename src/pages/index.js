import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
  addCardButton,
  cardsContainerSelector,
  options,
} from '../utils/constants.js';
import './index.css';




/** 
 * @description Создает экземпляр класса Card
 * @param {object} nameLinkData - Объект с именем карточки и ссылкой
 * @param {string} templateName - Шаблон карточки
 * @param {object} fooData - Объект с функциями
 * @return {object} - DOM элемент с карточкой
 * 
*/
const createCard = (nameLinkData, templateName, popupMethodOpen) => {

  const card = new Card(nameLinkData, templateName, popupMethodOpen)

  return card.generateCard();
}

/** 
 * @description Вызывается в момент сабмита формы редактирования профиля,
 * получает данные из формы, введенные пользователем,
 * получает текущие значения полей профиля методом getUserInfo,
 * записывает данные из формы в поля профиля методом setUserInfo
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleProfileFormSubmit = (inputData) => userInfo.setUserInfo(inputData)

/** 
 * @description Вызывается в момент сабмита формы добавления карточки,
 * получает данные из формы, введенные пользователем,
 * создает экземпляр класса Section,
 * вызывает метод rendererItems, добавляя новую карточку
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleAddCardFormSubmit = (inputData) => {

  const newCard = {
    name: inputData.form__text_type_name,
    link: inputData.form__text_type_about,
  }

  const cardElement = createCard(newCard, '.card-template', popupWithImgObj.open);

  sectionRenderer.prependItem(cardElement)

}


const formValidators = [...document.querySelectorAll('.form')]
  .reduce((accum, formElement) => {

    const validator = new FormValidator(options, formElement);
    validator.enableValidation();

    const formName = formElement.name;

    accum[formName] = validator;

    return accum
  }, {})


const popupWithImgObj = new PopupWithImage('.popup_target_card-fullscreen')
popupWithImgObj.setEventListeners()
const popupEditProfile = new PopupWithForm('.popup_target_edit-profile', handleProfileFormSubmit)
popupEditProfile.setEventListeners()
const popupAddCard = new PopupWithForm('.popup_target_add-card', handleAddCardFormSubmit);
popupAddCard.setEventListeners()


const userInfo = new UserInfo('.profile-info__name', '.profile-info__about');

const sectionRenderer = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, '.card-template', popupWithImgObj.open);

    sectionRenderer.addItem(cardElement)
  }
},
  cardsContainerSelector
)

editProfileButton.addEventListener('click', () => {
  formValidators['profile-edit'].toggleButtonState()

  const profileInfoData = userInfo.getUserInfo()
  popupEditProfile.setInputValues(profileInfoData)
  popupEditProfile.open()
})

addCardButton.addEventListener('click', () => {
  formValidators['card-add'].toggleButtonState()
  popupAddCard.open()

});

sectionRenderer.rendererItems()

