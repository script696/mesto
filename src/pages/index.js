import initialCards from '../utils/initialCards.js';
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
      console.log(data) //undefined потому что ответ еще не пршел но в блок then мы почему то вошли
      userInfo.setUserInfo(data)
      popupEditProfile.switchButtonText()
      popupEditProfile.close()
    })
    .catch(err => console.error(err))
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

  api.addNewCard(name, link)
    .then(item => {
      const cardElement = createCard({ item, cardsTemplateSelector, openPopupWithImg, openPopupWithConfirmation, handleCardsLike, userId });
      sectionRenderer.prependItem(cardElement)
    })
    .catch(err => console.error(err))
}

const handleEditProfile = ({ form__text_type_about: avatar }) => {
  api.editAvatar(avatar)
    .then(res => {
      if (res.ok) userInfo.editProfileAvatar(avatar)
    })
    .catch(err => console.error(err))
}

const deleteCard = (currentCard) => {
  const cardId = currentCard.getCardId()
  api.deleteCard(cardId)
    .then(res => {
      if (res.message = 'Пост удален') currentCard.removeCardElement()
    })
    .catch(err => console.error(err))

}


const openPopupWithConfirmation = (currentCard) => {
  popupWithConfirmation.open()
  popupWithConfirmation.setCurrentCard(currentCard)
}

const openPopupWithImg = (imageLink, imageText) => {
  popupWithImgObj.open(imageLink, imageText)
}

const handleCardsLike = (isILiked, cardId) => {

  if (isILiked) return api.toggleLike(cardId, 'PUT')
  else return api.toggleLike(cardId, 'DELETE')
}

const renderPage = () => {

  api.getUserInfo()
    .then(userData => {
      const { avatar, _id, name, about } = userData;

      userInfo.setUserInfo({ name, about })
      userInfo.setUserId(_id)
      userInfo.editProfileAvatar(avatar)

      api.getInitialCards()
        .then(cardsData => {
          sectionRenderer.rendererItems(cardsData, _id)
        })
        .catch(err => console.error(err))

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
const popupEditAvatar = new PopupWithForm('.popup_target_edit-avatar', handleEditProfile);
popupEditAvatar.setEventListeners()



const userInfo = new UserInfo('.profile-info__name', '.profile-info__about', '.profile-info__img');

const api = new Api({
  id: 'https://mesto.nomoreparties.co/v1/cohort-45',
  token: '4f28713c-cb2d-4ebc-a909-b129b423af46',
});


const sectionRenderer = new Section({
  renderer: (item, userId) => {
    const cardElement = createCard({ item, cardsTemplateSelector, openPopupWithImg, openPopupWithConfirmation, handleCardsLike, userId });

    sectionRenderer.addItem(cardElement)
  },
  cardsContainerSelector,
})

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

editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.open()
})

renderPage()

