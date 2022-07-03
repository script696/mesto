class UserInfo {
  constructor (nameSelector, aboutSelector){
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._profileNameElement = document.querySelector(this._nameSelector)
    this._profileAboutElement = document.querySelector(this._aboutSelector)
    this._profileData = {}
  }

  getUserInfo() {
       
    this._profileData['form__text_type_name'] = this._profileNameElement.textContent
    this._profileData['form__text_type_about'] = this._profileAboutElement.textContent

    return this._profileData
  }


  setUserInfo (data){
    this._profileNameElement.textContent = data.form__text_type_name;
    this._profileAboutElement.textContent = data.form__text_type_about;
  }

}

export default UserInfo