import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormSubmit){
    super(popupSelector)
    this._handleProfileFormSubmit = handleProfileFormSubmit;
  }
 
  _getInputValues(){
    const input = this._element.querySelector('.form_target_profile')
    const inputProfileName = this._element.querySelector('.form__text_position_top')
    const inputProfileAbout = this._element.querySelector('.form__text_position_bottom')
    
    return {input, inputProfileName, inputProfileAbout}
  }

  setEventListeners(){
    const {input, inputProfileName, inputProfileAbout} = this._getInputValues();

    super.setEventListeners()

    input.addEventListener('submit',  () => {
      const {nameText, aboutText} = this._handleProfileFormSubmit();

      nameText.textContent = inputProfileName.value
      aboutText.textContent = inputProfileAbout.value

      this.close()
    })

  }
}

export default PopupWithForm;