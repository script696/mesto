import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  editProfileButton,
  addCardButton,
  cardsContainerSelector,
  options,
  cardsTemplateSelector,
  editAvatarButton,
} from '../utils/constants.js';
import './index.css';
import Api from '../components/Api.js'




const formValidators = [...document.querySelectorAll('.form')]

  .reduce((accum, formElement) => {

    const validator = new FormValidator(options, formElement);
    validator.enableValidation();

    const formName = formElement.name;

    accum[formName] = validator;

    return accum
  }, {})



/** 
 * @description Создает экземпляр класса Card
 * @param {object} nameLinkData - Объект с именем карточки и ссылкой
 * @param {string} templateName - Шаблон карточки
 * @param {object} fooData - Объект с функциями
 * @return {object} - DOM элемент с карточкой
 * 
*/
const createCard = (data) => {
  const card = new Card(data)

  return card.generateCard();
}


/** 
 * @description При клике по лайку проверяет была ли уже лайкнута карточка и
 * если да, выполняет запрос на сервер для добавления лайка
 * если нет, выполняет запрос на сервер для удаления лайка
 * @param {object} card - Объект карточки
 * @param {boolean} isILiked - Лайкнута ли карточка пользователем
 * @param {string} cardId- Id карточки
 * 
*/
const apiCardsLike = (card, isILiked, cardId) => {

  if (isILiked) {
    api.toggleLike(cardId, 'PUT')
      .then(res => card.handleCardLike(res))
      .catch(err => console.error(err))
  }
  else {
    api.toggleLike(cardId, 'DELETE')
      .then(res => card.handleCardLike(res))
      .catch(err => console.error(err))
  }
}

/** 
 * @description Удаляет элемент карточки
 * @param {object} currentCard - Объект карточки
 * 
*/
const deleteCard = (currentCard) => {
  const cardId = currentCard.getCardId()
  api.deleteCard(cardId)
    .then(res => {
      currentCard.removeCardElement()
    })
    .catch(err => console.error(err))
}


/** 
 * @description Вызывается в момент сабмита формы редактирования профиля,
 * получает данные из формы, введенные пользователем,
 * отправляет запрос на сервер методом PATCH,
 * в случае успешного ответа записывает данные в поля
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleProfileFormSubmit = ({ form__text_type_name: name, form__text_type_about: about }) => {
  popupEditProfile.switchButtonText()

  api.modifyProfile(name, about)
    .then(data => {
      userInfo.setUserInfo(data)
      popupEditProfile.close()
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupEditProfile.switchButtonText()
    })
};

/** 
 * @description Вызывается в момент сабмита формы добавления карточки,
 * получает данные из формы, введенные пользователем,
 * создает экземпляр класса Section,
 * вызывает метод rendererItems, добавляя новую карточку
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleAddCardFormSubmit = ({ form__text_type_name: name, form__text_type_about: link }) => {
  const userId = userInfo.getUserId();
  popupAddCard.switchButtonText()

  api.addNewCard(name, link)
    .then(item => {
      const cardElement = createCard({ item, cardsTemplateSelector, openPopupWithImg, openPopupWithConfirmation, apiCardsLike, userId });
      sectionRenderer.prependItem(cardElement)
      popupAddCard.close()
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupAddCard.switchButtonText()
    })
}


/** 
 * @description Вызывается в момент сабмита формы редактирования,
 * получает данные из формы, введенные пользователем,
 * создает экземпляр класса Section,
 * вызывает метод rendererItems, добавляя новую карточку
 * @param {object} inputData - Объект с данными из формы, введенные пользователем
*/
const handleAvatarFormSubmit = ({ form__text_type_about: avatar }) => {
  popupEditAvatar.switchButtonText()

  api.editAvatar(avatar)
    .then(res => {
      userInfo.editProfileAvatar(avatar)
      popupEditAvatar.close()
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupEditAvatar.switchButtonText()
    })
}



/** 
 * @description Вызывается в нажатия на корзину удаления карточки,
 * открывает попап подтверждения удаления
 * @param {object} currentCard - Объект карточки
*/
const openPopupWithConfirmation = (currentCard) => {
  popupWithConfirmation.open()
  popupWithConfirmation.setCurrentCard(currentCard)
}


/** 
 * @description Вызывается в нажатия на карточку,
 * открывает попап полноэкранного отображения карточки
 * @param {object} currentCard - Объект карточки
*/
const openPopupWithImg = (imageLink, imageText) => {
  popupWithImgObj.open(imageLink, imageText)
}



/** 
 * @description Рендерит страницу при перезагрузке
 * делает запросы
 * информации пользователя, карточек
 * записывает данные в инстанс класса userInfo
 * рендерит страницу
 * 
*/
const renderPage = () => {
  Promise.all([
    api.getUserInfo(),
    api.getInitialCards(),
  ])
    .then(([{ avatar, _id, name, about }, cardsData]) => {
      userInfo.setUserInfo({ name, about, _id, avatar })
      sectionRenderer.rendererItems(cardsData, _id)
    })
    .catch(err => console.error(err))
}


const popupWithImgObj = new PopupWithImage('.popup_target_card-fullscreen')
popupWithImgObj.setEventListeners()
const popupEditProfile = new PopupWithForm('.popup_target_edit-profile', handleProfileFormSubmit)
popupEditProfile.setEventListeners()
const popupAddCard = new PopupWithForm('.popup_target_add-card', handleAddCardFormSubmit);
popupAddCard.setEventListeners()
const popupWithConfirmation = new PopupWithConfirmation('.popup_target_remove-confirmation', deleteCard);
popupWithConfirmation.setEventListeners()
const popupEditAvatar = new PopupWithForm('.popup_target_edit-avatar', handleAvatarFormSubmit);
popupEditAvatar.setEventListeners()

const userInfo = new UserInfo('.profile-info__name', '.profile-info__about', '.profile-info__img');

const api = new Api({
  id: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '4f28713c-cb2d-4ebc-a909-b129b423af46',
    'Content-Type': 'application/json',
  },
});

const sectionRenderer = new Section({
  renderer: (item, userId) => {
    const cardElement = createCard({ item, cardsTemplateSelector, openPopupWithImg, openPopupWithConfirmation, apiCardsLike, userId });

    sectionRenderer.addItem(cardElement)
  },
  cardsContainerSelector,
})



editProfileButton.addEventListener('click', () => {
  const profileInfoData = userInfo.getUserInfo()

  popupEditProfile.setInputValues(profileInfoData)
  popupEditProfile.open()
})

addCardButton.addEventListener('click', () => {
  formValidators['card-add'].toggleButtonState()
  popupAddCard.open()

});

editAvatarButton.addEventListener('click', () => {
  formValidators['edit-avatar'].toggleButtonState()

  popupEditAvatar.open()
})

renderPage()

