class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    this._profileNameElement = document.querySelector(this._nameSelector)
    this._profileAboutElement = document.querySelector(this._aboutSelector)
    this._profileAvatarElement = document.querySelector(this._avatarSelector)
    this._profileData = {}
  }

  getUserInfo() {

    this._profileData['form__text_type_name'] = this._profileNameElement.textContent;
    this._profileData['form__text_type_about'] = this._profileAboutElement.textContent;

    return this._profileData
  }

  setUserInfo({ name, about }) {
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }

  editProfileAvatar(link) {
    this._profileAvatarElement.src = link;
  }
}

export default UserInfo