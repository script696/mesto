const options = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
}


/** 
 * @description Активация сообщения при невалидном состоянии инпута формы
 * @param {object} formElement - Элемент DOM формы
 * @param {object} inputElement - Элемент DOM инпута
 * @param {string} errorMessage - сообщение об ошибке
 * @param {string} inputErrorClass - класс 'form__text_type_error'
 * @param {string} errorClass - класс 'form__text-error_active'
 */
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};


/** 
 * @description Деактивация сообщения при валидном состоянии инпута формы
 * @param {object} formElement - Элемент DOM формы
 * @param {object} inputElement - Элемент DOM инпута
 * @param {string} inputErrorClass - класс 'form__text_type_error'
 * @param {string} errorClass - класс 'form__text-error_active'
 */
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


/** 
 * @description Вызов функции showInputError при невалидном состоянии инпута,
 * вызов функции hideInputError при валидном состоянии инпута
 * @param {object} formElement - Элемент DOM формы
 * @param {object} inputElement - Элемент DOM инпута
 * @param {object} classOptions - объект с пропсами 
 */
const checkInputValidity = (formElement, inputElement, classOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classOptions);
  } else {
    hideInputError(formElement, inputElement, classOptions);
  }
};


/** 
 * @description Обработка инпутов форм, кнопки submit.  
 * Вызов функции checkInputValidit для каждого инпута формы(проверка на валидность),
 * активация/деактивация кнопки в зависимости от валидности инпутов
 * @param {object} formSelector - объект DOM с классом '.form'
 * @param {string} inputSelector - класс '.form__text'
 * @param {string} submitButtonSelector - класс '.form__button'
 */
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const buttonElement = formElement.querySelector(submitButtonSelector)

  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);

      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};


/** 
 * @description Обработка форм. Отмена стандартного поведения каждой формы,
 * вызов функции setEventListeners для каждой формы
 * @param {string} formSelector - класс '.form'
 */
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = [...document.querySelectorAll(formSelector)];

  formList.forEach(formElement => {
    formElement.addEventListener('submit', e => e.preventDefault());

    setEventListeners(formElement, rest);
  });

};


/** 
 * @description Проверка всех полей формы на валидность
 * @param {array} inputList - массив инпутов формы
 * @returns {boolean} - булево значение валидности инпутов
 */
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}


/** 
 * @description Активация/деактивация кнопки submit формы в зависимости от валидности ее полей
 * @param {array} inputList - массив инпутов формы
 * @param {object} buttonElement - элемент DOM кнопки
 * @param {string} inactiveButtonClass - класс 'button_inactive'
 */
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.removeAttribute('disabled');
  }
}


enableValidation(options);