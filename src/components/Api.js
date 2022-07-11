class Api {
  constructor({ id, token }) {
    this._id = id;
    this._token = token;
  }

  getUserInfo() {
    return fetch(`${this._id}/users/me`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(`${this._id}/cards`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  modifyProfile(name, about) {
    return fetch(`${this._id}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }


  addNewCard(name, link) {
    return fetch(`${this._id}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._id}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    }
    )
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  toggleLike(cardId, method) {
    return fetch(`${this._id}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  editAvatar(avatar) {
    return fetch(`${this._id}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      })
    })
      .then(res => {
        return res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}

export default Api