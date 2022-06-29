class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(this._popupSelector)
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    const popupCloseButton = this._element.querySelector('.popup__close-button')
    popupCloseButton.addEventListener('click', () => this.close())

    document.addEventListener('mousedown', (e) => {
      if (e.target.matches(this._popupSelector)) this.close()
    })
  }

  open() {
    this._element.classList.add('popup_opend');

    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
  }

  close() {
    this._element.classList.remove('popup_opend');

    document.removeEventListener('keydown', (e) => {
      this._handleEscClose(e)
    })
  }
}

export default Popup