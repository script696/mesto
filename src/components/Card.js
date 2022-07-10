class Card {

  constructor({ item,
    cardsTemplateSelector,
    openPopupWithImg,
    openPopupWithConfirmation,
    handleCardsLike,
    deleteCard,
    userId,
  }) {
    this._cardLink = item.link;
    this._cardName = item.name;

    this._cardSelector = cardsTemplateSelector;

    this._handleCardClick = openPopupWithImg;
    this._handleCardsLike = handleCardsLike;
    this._confirmCardRemovement = openPopupWithConfirmation;

    this._userId = userId;
    this._cardOwnerId = item.owner._id;
    this._isUserCard = this._userId === this._cardOwnerId;

    this._cardGarbagedeactivateSelector = 'card__garbage_inactive'

    this._cardId = item._id;
    this._cardLikes = item.likes;
    this._cardLikeOwner = item.owner;

  }

  _checkUserLike() {
    this._isLiked = this._cardLikes.some(likeData => likeData._id === this._userId)
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
    this._cardGarbage = this._element.querySelector('.card__garbage');
    this._likeCounter = this._element.querySelector('.card__like-counter');

    this._setEventListeners();

    this._image.src = this._cardLink;

    this._image.alt = this._cardName;
    this._name.textContent = this._cardName;

    this._countLikes()

    this._checkUserLike()
    this._fullfilledLikeLHeart()

    if (!this._isUserCard) this._cardGarbage.classList.add(this._cardGarbagedeactivateSelector)

    return this._element;
  }


  _countLikes() {
    this._likeCounter.textContent = this._cardLikes.length
  }

  _fullfilledLikeLHeart() {
    this._isLiked
      ? this._likeHeart.classList.add('card__logo-heart_style_filled')
      : this._likeHeart.classList.remove('card__logo-heart_style_filled')

    this._isLiked = !this._isLiked
  }

  _handleCardLike() {
    this._handleCardsLike(this._isLiked, this._cardId)
      .then(res => {
        this._cardLikes = res.likes
        this._countLikes()
        this._fullfilledLikeLHeart()
      })
  }

  removeCardElement() {
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
        this._confirmCardRemovement(this)
      })
  }

  getCardId() {
    return this._cardId
  }
}

export default Card;



