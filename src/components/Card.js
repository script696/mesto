class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._cardLink = data.link;
    this._cardName = data.name;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
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
    this._image = this._element.querySelector('.card__img')
    this._name = this._element.querySelector('.card__place-name')
    this._likeHeart = this._element.querySelector('.card__logo-heart');

    this._setEventListeners();

    this._image.src = this._cardLink;

    this._image.alt = this._cardName;
    this._name.textContent = this._cardName;

    return this._element;

  }


  _handleCardLike() {
    this._likeHeart.classList.toggle('card__logo-heart_style_filled');
  }

  _removeCardElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {

    this._image
      .addEventListener('click', (e) => {
        this._handleCardClick(e.target.src, e.target.alt)
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



