class UserInfo {
  constructor (nameSelector, aboutSelector){
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._profileNameElement = document.querySelector(this._nameSelector)
    this._profileAboutElement = document.querySelector(this._aboutSelector)
  }

  getUserInfo() {
    return {
      nameElem : this._profileNameElement, 
      aboutElem : this._profileAboutElement,
    }
  }

  setUserInfo({nameElem, aboutElem}, {inputTopVal, inputBottomVal}){
    nameElem.textContent = inputTopVal.value;
    aboutElem.textContent = inputBottomVal.value;
  }

}

export default UserInfo