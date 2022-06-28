import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormSubmit) {
    super(popupSelector)
    this._handleProfileFormSubmit = handleProfileFormSubmit;
    this._form = this._element.querySelector('.form');

  }

  _getInputValues() {
    this._inputTopVal = this._element.querySelector('.form__text_position_top')
    this._inputBottomVal = this._element.querySelector('.form__text_position_bottom')

    return { input : this._form, inputTopVal: this._inputTopVal, inputBottomVal: this._inputBottomVal}
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