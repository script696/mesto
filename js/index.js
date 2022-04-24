//Элементы DOM profile
const editProfileButton = document.querySelector('.profile-info__edit-button');
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__about');
//Элементы DOM form
const formElement = document.querySelector('.form');
const inputElements = formElement.querySelectorAll('.form__text');
const formSubmit = formElement.querySelector('.form__button');
//Элементы DOM popup
const popup = document.querySelector('.popup');
const popupBody = popup.querySelector('.popup__body');
const closePopupButton = popup.querySelector('.popup__close-button');
//Элементы DOM cards
const cardsElement = document.querySelector('.cards');

//Запись в поля формы дефолтных значений
inputElements[0].value = `${profileName.textContent}`;
inputElements[1].value = `${profileAbout.textContent}`;

//Слушатели открытия/закрытия попапа
editProfileButton.addEventListener('click', popupSwitch);
closePopupButton.addEventListener('click', popupSwitch);

//Слушатели формы
formElement.addEventListener('submit', formSubmitHandler);

//Слушатели кнопки лайков (сердечко), заливка иконки цветом
cardsElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('card__path')) {
    e.target.parentElement.classList.toggle('card__logo-heart_style_filled');
  }
});

//Задание плейсхолдера полей ввода в дефолтное значение
placeholderReset()

//Функция задания/сброса плейсхолдера полей ввода в дефолтное значение
function placeholderReset() {
  inputElements[0].placeholder = 'Имя';
  inputElements[1].placeholder = 'О себе';
}
//Функция открытия/закрытия попапа
function popupSwitch() {
  popup.classList.toggle('popup_opend');
  popupBody.classList.toggle('popup__body_opened');
}

/* Функция редактирования профиля.
Если пользователь не ввел значения в поля формы,
плейсхолдер меняется на  'Обязательное поле',
иначе информация в профиле редактируется и плейсхолдер сбрасывается*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  if (!inputElements[0].value.length) {
    inputElements[0].placeholder = 'Обязательное поле';
  } else if (!inputElements[1].value.length) {
    inputElements[1].placeholder = 'Обязательное поле';
  } else {
    profileName.textContent = inputElements[0].value;
    profileAbout.textContent = inputElements[1].value;
    placeholderReset();
    popupSwitch();
  }
}








