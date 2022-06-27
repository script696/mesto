class Card {

  constructor(data, cardSelector, { openPopup, figureImage, figureName, popupCardFullscreen }, testObject, handleCardClick) {
    this._cardLink = data.link;
    this._cardName = data.name;

    this._cardSelector = cardSelector;

    this._openPopup = openPopup;
    this._popupCardFullscreen = popupCardFullscreen;
    this._figureImage = figureImage;
    this._figureName = figureName;

    this._testObject = testObject;
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

    this._setEventListeners();

    this._image.src = this._cardLink;

    this._image.alt = this._cardName;
    this._name.textContent = this._cardName;

    return this._element;

  }

  // _openPopupFullscreen(e) {
  //   console.log(this)
  //   this._figureImage.src = e.target.src;
  //   this._figureImage.alt = e.target.alt;
  //   this._figureName.textContent = e.target.alt

  //   this._openPopup(this._popupCardFullscreen)
  // }

  _handleCardLike() {
    const cardLikeButton = this._element.querySelector('.card__logo-heart');
    cardLikeButton.classList.toggle('card__logo-heart_style_filled');
  }

  _removeCardElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {

    this._element.querySelector('.card__img')
      .addEventListener('click', (e) => {
        this._handleCardClick.call(this._testObject, this._figureImage, this._figureName, e.target.src, e.target.alt)
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



// this._element.querySelector('.card__img')
//       .addEventListener('click', (e) => {
//         this._openPopupFullscreen(e)
//       });




// _openPopupFullscreen(e) {
//   console.log(this)
//   this._figureImage.src = e.target.src;
//   this._figureImage.alt = e.target.alt;
//   this._figureName.textContent = e.target.alt

//   this._openPopup(this._popupCardFullscreen)
// }