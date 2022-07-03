import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormSubmit) {
    super(popupSelector)
    this._handleProfileFormSubmit = handleProfileFormSubmit;
    this._form = this._element.querySelector('.form');
    this._inputList = this._element.querySelectorAll('.form__text');
    this._formValues = {};

  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => input.value = data[input.name]);
  }


  setEventListeners() {
    super.setEventListeners()

    this._form.addEventListener('submit', (e) => {

      e.preventDefault();

      this._handleProfileFormSubmit(this._getInputValues());

      this.close()
    })
  }


  close() {
    this._form.reset()

    super.close()
  }
}

export default PopupWithForm;