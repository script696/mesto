import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  
  open(figureImage, figureName, imageLink, imageText){
    super.open()
    figureImage.src = imageLink;
    figureImage.alt = imageText;
    figureName.textContent = imageText;
  }
}

export default PopupWithImage;