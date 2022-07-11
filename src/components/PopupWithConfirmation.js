import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteCard){
    super(popupSelector)
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupRemoveConfirmationButton = this._element.querySelector('.form__button')
      .addEventListener('click', () => {
        this._deleteCard(this._currentCard)
        this.close()
      })
  }

  setCurrentCard(currentCard){
    this._currentCard = currentCard;
  }
}

export default PopupWithConfirmation;