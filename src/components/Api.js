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
      .then(res => res.json())
  }

  getInitialCards() {
    return fetch(`${this._id}/cards`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(res => res.json())
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
        setTimeout(()=>{return res.json()},4000)
        // return res.ok
        //   ? res.json()
        //   : Promise.reject(`Ошибка: ${res.status}`)
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
      .then(res => res.json())
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
      .then(res => res.json())
  }

  toggleLike(cardId, method) {
    return fetch(`${this._id}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
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

  }
}




export default Api