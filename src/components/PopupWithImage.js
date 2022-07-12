import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._figureImage = this._element.querySelector('.figure__img');
    this._figureName = this._element.querySelector('.figure__name');
  }

  open = (imageLink, imageText) => {
    super.open()
    this._figureImage.src = imageLink;
    this._figureImage.alt = imageText;
    this._figureName.textContent = imageText;
  }
}

export default PopupWithImage;