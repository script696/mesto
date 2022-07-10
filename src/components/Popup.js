class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._element.querySelector('.popup__close-button');
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close())

    this._element.addEventListener('mousedown', (e) => {
      if (e.target.matches(this._popupSelector)) this.close()
    })
  }

  open() {
    this._element.classList.add('popup_opend');

    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._element.classList.remove('popup_opend');

    document.removeEventListener('keydown', this._handleEscClose)
  }
}

export default Popup