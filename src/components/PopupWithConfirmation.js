import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector)
    this._deleteCard = deleteCard;

  }

  setEventListeners() {
    super.setEventListeners()

    this._element.addEventListener('submit', (e) => {

      e.preventDefault();

      this._deleteCard(this._currentCard)
      this.close()
    })
   
  }

  setCurrentCard(currentCard) {
    this._currentCard = currentCard;
  }
}

export default PopupWithConfirmation;