class UserInfo {
  constructor (nameSelector, aboutSelector){
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._profileNameElement = document.querySelector(this._nameSelector)
    this._profileAboutElement = document.querySelector(this._aboutSelector)
  }

  getUserInfo() {
    return {
      nameText : this._profileNameElement, 
      aboutText : this._profileAboutElement,
    }
  }

  setUserInfo(){
    
  }

}

export default UserInfo