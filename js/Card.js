class Card {

  constructor(data, cardSelector, { openPopup, figureImage, figureName, popupCardFullscreen }) {
    this._cardLink = data.link;
    this._cardName = data.name;

    this._cardSelector = cardSelector;

    this._openPopup = openPopup;
    this._popupCardFullscreen = popupCardFullscreen;
    this._figureImage = figureImage;
    this._figureName = figureName;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._cardLink;
    this._element.querySelector('.card__img').alt = this._cardName;
    this._element.querySelector('.card__place-name').textContent = this._cardName;

    return this._element;
  }

  _openPopupFullscreen(e) {
    this._figureImage.src = e.target.src;
    this._figureImage.alt = e.target.alt;
    this._figureName.textContent = e.target.alt
    // openPopup(popupCardFullscreen);
    this._openPopup(this._popupCardFullscreen)
  }

  _handleCardLike() {
    const cardLikeButton = this._element.querySelector('.card__logo-heart');
    cardLikeButton.classList.toggle('card__logo-heart_style_filled');
  }

  _removeCardElement() {
    this._element.remove();
  }

  _setEventListeners() {

    this._element.querySelector('.card__img')
      .addEventListener('click', (e) => {
        this._openPopupFullscreen(e)
      });

    this._element.querySelector('.card__logo-heart')
      .addEventListener('click', () => {
        this._handleCardLike()
      });

    this._element.querySelector('.card__garbage')
      .addEventListener('click', () => {
        this._removeCardElement()
      })
  }
}

export default Card;


